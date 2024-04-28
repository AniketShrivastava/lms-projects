import app from "./app.js";
import connectToDB from "./config/dbConfig.js";


const PORT = process.env.PORT || 5011;

app.listen(PORT, async () => {
    // Connect to DB
    await connectToDB();
    console.log(`App is running at http://localhost:${PORT}`);
  });