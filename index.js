const dotenv = require('dotenv')
const app = require("./server")

dotenv.config()

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log("Server is running on port:", port)
})