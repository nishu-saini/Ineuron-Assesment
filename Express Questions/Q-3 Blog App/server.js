const app = require("./app");
const PORT = 3000; // You can change the port number as per your requirement

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
