import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import { useRouter } from "../../routes/hooks";

import { bgGradient } from "../../theme/css";

import Logo from "../../components/logo";
import Iconify from "../../components/iconify";
import { register } from "../../services/auth.api";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

// ----------------------------------------------------------------------

export default function RegisterView() {
    const theme = useTheme();
    const router = useRouter();

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const registerMutation = useMutation({
        mutationFn: (body) => register(body),
    });

    const handleClick = (body) => {
        registerMutation.mutate(body, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: "/assets/background/overlay_4.jpg",
                }),
                height: 1,
            }}
        >
            <Logo
                sx={{
                    position: "fixed",
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            />

            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ height: 1 }}
            >
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4">Sign up for Crawler</Typography>

                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Already have an account?
                        <Link
                            style={{ color: "#1877F2", marginLeft: "4px" }}
                            to="/login"
                        >
                            Log in now!
                        </Link>
                    </Typography>

                    <>
                        <Stack
                            component={"form"}
                            spacing={3}
                            my={3}
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleClick({
                                    FullName: fullname,
                                    Email: email,
                                    Username: username,
                                    Password: password,
                                    Phone: phone,
                                    RoleID: 3,
                                    Role: "Basic",
                                });
                            }}
                        >
                            <TextField
                                required
                                name="fullname"
                                label="Full Name"
                                value={fullname}
                                onChange={(e) => {
                                    setFullname(e.target.value);
                                }}
                            />
                            <TextField
                                required
                                name="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <TextField
                                required
                                name="username"
                                label="Username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <TextField
                                required
                                name="phone"
                                label="Phone"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                            <TextField
                                required
                                name="password"
                                label="Choose password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end"
                                            >
                                                <Iconify
                                                    icon={
                                                        showPassword
                                                            ? "eva:eye-fill"
                                                            : "eva:eye-off-fill"
                                                    }
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                required
                                name="password2"
                                label="Confirm password"
                                type={showPassword ? "text" : "password"}
                                value={password2}
                                onChange={(e) => {
                                    setPassword2(e.target.value);
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end"
                                            >
                                                <Iconify
                                                    icon={
                                                        showPassword
                                                            ? "eva:eye-fill"
                                                            : "eva:eye-off-fill"
                                                    }
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="inherit"
                            >
                                Sign up
                            </LoadingButton>
                        </Stack>
                    </>
                </Card>
            </Stack>
        </Box>
    );
}
