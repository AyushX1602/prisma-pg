import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
const client = new PrismaClient();

app.get("/users", async (req, res) => {
    const users = await client.user.findMany();
    res.json(users);
})

app.get("/todos/:id",async(req,res)=>{
    const id = req.params.id;
    const todo = await client.todo.findUnique({
        where: {
            id: parseInt(id)
        },
        select: {
            title: true,
            done: true,
            user: true
        }
    });
    res.json(todo);
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})

async function main() {
    // const user = await client.user.create({
    //     data: {
    //         username: "ayush3",
    //         password: "2222",
    //         age: 21
    //     }

        const user = await client.user.findUnique({
            where: {
                id: 1
            },
            include: {
                Todos: true
            }
        });
    // });
    console.log('User created:', user);
}

main()
    .catch(console.error)
    .finally(() => client.$disconnect());