// const express = require('express');
// const fs = require('fs');

// const app = express();
// const port = 3001;

// app.use(express.static('public'));
// app.use(express.json());

// app.post('/saveToFile', (req, res) => {
//     const data = req.body.data;

//     try {
//         fs.writeFileSync('public/output.txt', data);
//         res.json({ message: 'Data saved to file successfully!' });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Failed to save data to file.' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });


const express = require('express');
const fs = require('fs');

const app = express();
const port = 3001; // Change this to the port you're using

app.use(express.static('public'));
app.use(express.json());

app.post('/saveToFile', (req, res) => {
    const data = req.body.data;

    try {
        // Read existing data from the file (if it exists)
        let existingData = '';
        try {
            existingData = fs.readFileSync('public/output.txt', 'utf-8');
        } catch (readError) {
            // File doesn't exist, ignore the error
        }

        // Append new data to the existing data
        const newData = existingData + '\n' + data;

        // Write the combined data back to the file
        fs.writeFileSync('public/output.txt', newData);

        res.json({ message: 'Data saved to file successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to save data to file.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
