import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "../api/authApi";
import { IModalAuth } from "../interfaces/modals";
const Auth = () => {
  const { register, handleSubmit, watch, control, reset } =
    useForm<IModalAuth>();
  const onSubmit: SubmitHandler<IModalAuth> = useCallback((data) => {
    login(data);
  }, []);

  return (
    <Grid
      container
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
    >
      <Typography variant={"h5"}>Авторизация</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          autoFocus
          margin="dense"
          label="Логин"
          fullWidth
          variant="standard"
          {...register("name")}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Пароль"
          type="string"
          fullWidth
          {...register("password")}
          variant="standard"
        />
        <Box mt={1}>
          <Button variant="contained" type="submit">
            Войти
          </Button>
        </Box>
      </form>
    </Grid>
  );
};

export default observer(Auth);
