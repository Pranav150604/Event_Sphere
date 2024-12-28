// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");
const Event = require('./models/Event');
const Ticket = require('./models/Ticket');
const Order = require('./models/Order');
const JWT_SECRET = 'pavanydg'
const cors = require("cors");
const Payment = require('./models/Payment');

const app = express();
const port = 3001;
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourusername',
  password: 'yourpassword',
  database: 'event_management'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Database connected!');
});

// middle ware

const middleWare = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log(token)
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  })
}

// authenticate middleware

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.replace("Bearer ", "").trim(); // Ensure no extra spaces

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

app.get('/protected', middleWare, (req, res) => {
  res.status(200).json({ message: 'You have access to this route', user: req.user });
});


// for signup

app.post('/signup', (req, res) => {
  const { uname, password, phone_no, user_type, email } = req.body;

  if (!uname || !password || !phone_no || !user_type || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // check if email is taken 

    const emailQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(emailQuery, [email], async (err, resu) => {
      if (resu.length > 0) {
        return res.status(400).json({ error: "Email already taken" });
      }
    })


    const query = 'INSERT INTO users (uname, password, phone_no, user_type, email) VALUES (?, ?, ?, ?, ?)';
    const values = [uname, password, phone_no, user_type, email];

    connection.query(query, values, (error, results) => {
      res.status(200).json({ message: 'User created successfully' });
    })
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// for signin

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  connection.query(query, [email, password], async (error, results) => {
    if (error) {
      console.log("Error querying user: ", error);
      return res.status(500).json({ error: "Database error" })
    }
    console.log(results)
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    const token = jwt.sign({ uid: user.uid, uname: user.uname, user_type: user.user_type }, JWT_SECRET);

    res.status(200).json({
      msg: "Signin successful",
      token
    })

  })
})

// create event

app.post('/events', authenticateToken, async (req, res) => {
  console.log("events at")
  if (!req.user) {
    return res.status(403).json({ error: "Forbidden" });
  }
  try {
    const organizer_id = req.user.uid;
    // console.log(organizer_id)
    const { title, description, date, time, location, category } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      organizer_id,
      category
    });
    // console.log(event)
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create event" })
  }
})

// creating tickets

app.post('/events/tickets/:event_id', async (req, res) => {
  try {
    // Extract event_id from URL parameters and ticket details from the request body
    const { event_id } = req.params;
    const { ticket_type, ticket_description, price, quantity } = req.body;

    // Validate input fields
    if (!ticket_type || !price || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create the ticket
    const ticket = await Ticket.create({
      event_id,
      ticket_type,
      ticket_description,
      price,
      quantity,
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error); // Log the error
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// POST /orders - Create a new order for tickets
app.post('/order/:tid', async (req, res) => {
  try {
    const tid = req.params.tid;
    const { userId, order_quantity } = req.body;
    // const userId = req.user.uid; // Assuming req.user contains the authenticated user info

    if (!tid || !order_quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the ticket exists and has enough available quantity
    const ticket = await Ticket.findByPk(tid);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (order_quantity > ticket.quantity) {
      return res.status(400).json({ error: 'Not enough tickets available' });
    }

    // Calculate total price
    const totalPrice = ticket.price * order_quantity;

    // Create the order
    const order = await Order.create({
      uid: userId,
      eid: ticket.event_id,
      tid,
      order_quantity,
      total_price: totalPrice,
    });

    // Update the available quantity of the ticket
    await ticket.update({
      quantity: ticket.quantity - order_quantity,
    });

    const payment = await Payment.create({
      oid: order.oid, // Assuming the `order` object has an `id` field
      pdate: new Date(),
      pamount: totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get("/get_events", (req, res) => {
  try {
    const query = "select * from events"
    connection.query(query, (err, resu) => {
      res.status(200).json({
        results: resu
      })
    })

  } catch (e) {
    res.status(500).json({ error: "Error whlie fetching events" })
  }
})

// get the events organized by the organizer

app.get("/getOrganizersEvents/:id", (req, res) => {
  const userid = req.params.id; // Access the id property correctly
  try {
    const query = 'SELECT * FROM events WHERE organizer_id = ?';
    connection.query(query, [userid], (err, resu) => {
      if (err) {
        res.status(500).json({ error: "Error while fetching events" });
      } else {
        res.status(200).json({
          results: resu
        });
      }
    });
  } catch (e) {
    res.status(500).json({ error: "Error while fetching events" });
  }
});

// get details about an event
app.get("/geteventDetail/:id", (req, res) => {
  const userid = req.params.id; // Access the id property correctly
  try {
    const query = 'SELECT * FROM events WHERE eid = ?';
    connection.query(query, [userid], (err, resu) => {
      if (err) {
        res.status(500).json({ error: "Error while fetching events" });
      } else {
        res.status(200).json({
          results: resu
        });
      }
    });
  } catch (e) {
    res.status(500).json({ error: "Error while fetching events" });
  }
});

// get particular event tickets;

app.get("/geteventTickets/:id", (req, res) => {
  const eventid = req.params.id; // Access the id property correctly
  try {
    const query = 'SELECT * FROM tickets WHERE event_id = ?';
    connection.query(query, [eventid], (err, resu) => {
      if (err) {
        res.status(500).json({ error: "Error while fetching events" });
      } else {
        res.status(200).json({
          results: resu
        });
      }
    });
  } catch (e) {
    res.status(500).json({ error: "Error while fetching events" });
  }
});

app.get("/placingOrder/:ticketid", (req, res) => {
  const tid = req.params.ticketid;

  const query = `
    SELECT 
      tickets.tid AS ticket_id,
      tickets.event_id,
      tickets.ticket_type,
      tickets.ticket_description,
      tickets.price,
      tickets.quantity,
      events.eid AS event_id,
      events.title AS event_title,
      events.description AS event_description,
      events.date AS event_date,
      events.time AS event_time,
      events.location AS event_location,
      events.organizer_id,
      events.category
    FROM 
      tickets
    JOIN 
      events ON tickets.event_id = events.eid
    WHERE 
      tickets.tid = ?
  `;

  connection.query(query, [tid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error while fetching ticket and event details" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({ results: result[0] });
  });
});

app.get("/userTickets",(req,res) => {
  const {uid} = req.query;
  const query = "SELECT * from orders where uid=?"
  connection.query(query,[uid],(err,result) => {
    if (err) {
      return res.status(500).json({ error: "Error while fetching ticket and event details" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({ results: result });
  })
})

// show tickets of a particular event 

app.get("/showTickets",(req,res) => {
  const {eid} = req.query;
  const query = "SELECT * from tickets where event_id=?"
  connection.query(query,[eid],(err,result) => {
    if (err) {
      return res.status(500).json({ error: "Error while fetching ticket and event details" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({ results: result });
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
