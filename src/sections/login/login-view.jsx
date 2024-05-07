import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
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
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/auth.api";
import { loginSlice } from "../../redux/auth.slice";

// ----------------------------------------------------------------------

export default function LoginView() {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const loginMutation = useMutation({
        mutationFn: (body) => login(body),
    });

    const handleClick = (e) => {
        // router.replace("/");
        e.preventDefault();
        loginMutation.mutate(
            { Username: username, Password: password },
            {
                onSuccess: (data) => {
                    setUsername("");
                    setPassword("");
                    dispatch(loginSlice(data.data));
                    Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: "true",
                    }).fire({
                        icon: "success",
                        title: "Login successfully",
                    });
                },
                onError: (error) => {
                    Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: "true",
                    }).fire({
                        icon: "error",
                        title: "Login failed",
                        text: error.response.data.message,
                    });
                },
            }
        );
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
                    <Typography variant="h4">Sign in to Crawler</Typography>
                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                        Don’t have an account?
                        <Link
                            style={{ color: "#1877F2", marginLeft: "4px" }}
                            to="/register"
                        >
                            Get started
                        </Link>
                    </Typography>
                    {/* <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            variant="outlined"
                            sx={{
                                borderColor: alpha(
                                    theme.palette.grey[500],
                                    0.16
                                ),
                            }}
                        >
                            <Iconify icon="eva:google-fill" color="#DF3E30" />
                        </Button>

                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            variant="outlined"
                            sx={{
                                borderColor: alpha(
                                    theme.palette.grey[500],
                                    0.16
                                ),
                            }}
                        >
                            <Iconify icon="eva:facebook-fill" color="#1877F2" />
                        </Button>
                    </Stack> */}

                    <Divider sx={{ my: 3 }}>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                        >
                            OR
                        </Typography>
                    </Divider>

                    <>
                        <Stack spacing={3}>
                            <TextField
                                name="username"
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        </Stack>

                        {/* <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-end"
                            sx={{ my: 3 }}
                        >
                            <Link style={{ color: "#1877F2" }}>
                                Forgot password?
                            </Link>
                        </Stack> */}

                        <LoadingButton
                            sx={{ my: 3 }}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="inherit"
                            onClick={(e) => {
                                handleClick(e);
                            }}
                        >
                            Login
                        </LoadingButton>
                    </>
                </Card>
            </Stack>
        </Box>
    );
}
