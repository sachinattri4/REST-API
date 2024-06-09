const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json'); 


const app = express();
const port = 4000;

//middleware plugin
app.use(express.urlencoded({ extended: false }));


app.get('/api/users', (req, res)=>{
    return res.json(users);
});

app.get('/api/users/:id', (req, res)=>{
    const id = Number(req.params.id);
    const user =  users.find((user)=>{ return user.id === id});
    return res.json(user);
});

app.get('/', (req, res)=>{
    const html = `<ul> ${users.map(user=>`<li>${user.first_name}</li>`).join('')} </ul>`;
    return res.send(html);
});

app.get('/users/:id', (req, res)=>{
    const id = Number(req.params.id);
    const user =  users.find((user)=>{ return user.id === id});
    const html = `<ul> <li>${user.first_name}</li></ul>`;
    return res.send(html);
});

app.route('/users').post((req, res)=>{
    const body = req.body;
    users.push({...body,id: users.length + 1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err, data)=>{
        return console.log(res.json({Status:'success'}));
    }) 
}).patch((req,res)=>{
    return res.json('pending'); 
}).delete(()=>{
    return res.json('pending');
})

app.listen(port,()=>{
    console.log(`server started ${port}`);
})