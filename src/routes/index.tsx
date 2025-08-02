// src/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import { get } from "node:http";

import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "../css/customTheme";

import "../css/styles.css";
import styles from "../css/footer.module.css";

import Button from "@mui/material/Button";

// const filePath = "./public/count.txt";

// async function readCount() {
//   return parseInt(
//     await fs.promises.readFile(filePath, "utf-8").catch(() => "0")
//   );
// }

interface Todo {
  userID: number;
  id: number;
  title: string;
  completed: boolean;
}

const getTodo = createServerFn({
  method: "GET",
}).handler(async () => {
  const res = await axios("https://jsonplaceholder.typicode.com/todos/11");
  return res.data;
});

// const getUser = createServerFn({
//   method: "GET",
// }).handler(async () => {
//   const res = await axios("https://api.github.com/users/efgarro");
//   return res.data;
// });

export const getServerTime = createServerFn({ method: "GET" }).handler(
  async () => {
    return new Date().toISOString();
  }
);

export const getServerData = createServerFn({ method: "GET" }).handler(
  async () => {
    return {
      message: "Hello, World!",
    };
  }
);

// const updateCount = createServerFn({ method: "POST" })
//   .validator((d: number) => d)
//   .handler(async ({ data }) => {
//     const count = await readCount();
//     await fs.promises.writeFile(filePath, `${count + data}`);
//   });
// console.log(getServerTime());
// getUser();

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getTodo(),
});

function Home() {
  // const router = useRouter();
  const data = Route.useLoaderData();
  console.log(data);
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Button variant="contained">Hello world</Button>
        <p>Hellow {data.title}</p>
        <h2>BijaLapa</h2>
        <footer className={`${styles.footer_box}`}>Footer</footer>
      </ThemeProvider>
    </>
  );
}
