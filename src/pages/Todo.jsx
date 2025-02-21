import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Todo = () => {
    const [todo, setTodo] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/todolist/${id}`);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

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

    return (
        <div>
            <div>
                <Card className="w-[750px]">
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            <h1>{todo.title}</h1>
                            <div className="flex space-x-4">
                                <Button onClick={handleEdit} variant="blue">
                                    Edit
                                </Button>
                                <Button onClick={handleDelete} variant="destructive">
                                    Delete
                                </Button>
                            </div>
                        </CardTitle>
                        <CardDescription>{todo.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center py-10">
                        <p>{todo.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <h1>Made with ♥ by Jaes--Jessca</h1>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Todo;