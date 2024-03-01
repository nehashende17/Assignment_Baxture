"use client";
import { Grid, GridCol } from "@mantine/core";
import { UserInfo } from "./ui/UserInfo/UserInfo";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [users, setUsers] = useState([]);

  const handleDeleteUser = (id : number) => {
    const userList = JSON.parse(JSON.stringify(users));
    const index = userList.findIndex((user: any) => user.id == id);
    if (index >= 0) {
      userList.splice(index, 1);
      setUsers(userList);
    }
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()).then((data) => setUsers(data));
  }, []);

  return (
    <Grid>
      {users && users.map((user): any => 
        <GridCol span={{base: 12, md: 6, lg: 3}} key={`${user.id}-${user.userName}`}>
          <UserInfo id={user.id} name={user.name} email={user.email} phone={user.phone} website={user.website} handleDeleteUser={handleDeleteUser}/>
        </GridCol>
        )}
    </Grid>
  );
}
