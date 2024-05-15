## FictiChat
FictiChat is a AI chat app that enable users to engage in interactive conversations with famous characters and historical figures, whether for entertainment or educational purposes.

### Immersive Conversations
Dive deep into conversations with beloved characters such as Homer Simpson, Mario, Batman, and more. Our advanced AI ensures that interactions feel genuine and meaningful.

### Deep Insights
Gain unique perspectives and insights from characters with diverse backgrounds and expertise. Whether it is discussing technology with Nikola Tesla or about crossing the Atlantic Ocean with Amelia Earhart, you will expand your knowledge in fascinating ways.

### Constant Updates
If you have any new character suggestions through them through the feedback form, there is always something fresh to discover. Expand your roster of conversational companions and unlock even more exciting dialogue options.

### Safe and Secure
Rest assured that your conversations are private and secure. We prioritize user privacy and data protection to ensure a worry-free experience.

## Getting Started
To get started with FictiChat, follow these steps:

```bash
git clone https://github.com/anagarango/FictiChat.git

cd FictiChat
```

Set up the database and configure authentication according to the provided instructions:
- Create a .env.local file with these environmental variables:
```js
OPENAI_API_KEY=
MYSQLPORT=
MYSQLDATABASE=
MYSQLPASSWORD=
MYSQLUSER=
MYSQLHOST=
```
- [OpenAI API](https://openai.com/index/openai-api/), sign up and paste the API key to OPENAI_API_KEY
- Add your credentials of your MySQL database, set up a database and add tables found under: src/app/api/mysql/db.sql;

Start the server by running npm start.
```bash
npm install

npm run dev
```

## Technologies Used
- NextJS/React
- TypeScript
- TailwindCSS
- Axios
- OpenAI
- MySQL
- NodeMailer
- react-code-blocks
- [Free MySQL Hosting](https://www.freemysqlhosting.net)
- [Spoonacular API](https://spoonacular.com/food-api)
