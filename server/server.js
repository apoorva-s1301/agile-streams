const cors = require("cors");
const express = require("express")
const http = require("http")
const PORT = process.env.PORT || 5000;

const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
})

app.use(cors());
app.get("/", (req, res) => {
	res.send("Running");
});

//Socket functions
io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		socket.broadcast.emit("updateUserMedia", {
			type: data.type,
			currentMediaStatus: data.myMediaStatus,
		});
		io.to(data.to).emit("callAccepted", data.signal)
	})

	socket.on("updateMyMedia", ({ type, currentMediaStatus }) => {
		socket.broadcast.emit("updateUserMedia", { type, currentMediaStatus });
	});
	
	socket.on("msgUser", ({ name, to, msg, sender }) => {
		io.to(to).emit("msgRcv", { name, msg, sender });
	});
	
})

server.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));