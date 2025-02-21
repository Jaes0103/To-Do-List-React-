import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const EditToDo = () => {
    const [todo, setTodo] = useState({ title: "", description: "", date: "" });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/todolist/${id}`);
                setTodo(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTodo();
    }, [id]);

    const handleChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/todolist/${id}`, todo);
            navigate(`/todo/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Card className="w-[750px]">
                <CardHeader>
                    <CardTitle>Edit To Do</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <Input
                            type="text"
                            name="title"
                            value={todo.title}
                            onChange={handleChange}
                            placeholder="Title"
                        />
                        <Textarea
                            name="description"
                            value={todo.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                        <Input
                            type="date"
                            name="date"
                            value={todo.date}
                            onChange={handleChange}
                        />
                        <Button type="submit" variant="blue">
                            Save Changes
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => navigate(-1)} variant="outline">
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default EditToDo;