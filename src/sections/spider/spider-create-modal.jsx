import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from '@mui/base/Input';
import { Unstable_Grid as Grid } from '@mui/system';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Iconify from "../../components/iconify";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getKeyword } from "../../services/keyword.api";
import { useQuery } from "@tanstack/react-query";
import { updateSpiderBasicSettingById, updateSpiderUrlById, createWebpageSpider, createWebsiteSpider } from "../../services/spider.api";
import Swal from "sweetalert2";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function SpiderCreateModal(prop) {
    const [data, setData] =  useState({
      "type": "WebsiteSpider",
      "url": "",
      "delay": 2,
      "graphdeep": 3,
      "maxThread": 1,
    })

    const profile = JSON.parse(localStorage.getItem("profile"))

    const handleCreateWebpageSpider = async () => {
      const response = await createWebpageSpider(
        profile.id,
        data
      )

      if (response.status == 200) {
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: "true",
        }).fire({
            icon: "success",
            title: "\n\nCreate spider successfully. Please refresh page.",
        });
      } else {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: "true",
        }).fire({
            icon: "error",
            title: "\n\nCreate Spider failed"
        });
      }
    }

    const handleCreateWebsiteSpider = async () => {
      console.log(data)

      const response = await createWebsiteSpider(
        profile.id,
        data
      )

      if (response.status == 200) {
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: "true",
        }).fire({
            icon: "success",
            title: "\n\nCreate spider successfully. Please refresh page.",
        });
      } else {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: "true",
        }).fire({
            icon: "error",
            title: "\n\nCreate Spider failed"
        });
      }
    }
    
    return (
        <Modal
            {...prop}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={0} sx={{ flexGrow: 0 }}>
                    <Grid xs={10}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create Spider
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Button
                            variant="contained"
                            color="inherit"
                            startIcon={<Iconify icon="eva:brush-outline" />}
                            onClick={
                              () => data.type == "WebsiteSpider" ? handleCreateWebsiteSpider() : handleCreateWebpageSpider()
                            }
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
                <form
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Grid container spacing={0} sx={{ flexGrow: 0 }}>    
                        <Grid xs={8}>
                            <TextField
                                label="url"
                                name="url"
                                margin="normal"
                                defaultValue={data.url}
                                value={data.url}
                                onChange={(e) => setData({...data, url: e.target.value})}
                            />   
                        </Grid>     
                        <Grid xs={4}>
                            <InputLabel>Type</InputLabel> 
                            <Select
                                value={data.type}
                                label="Type"
                                onChange={(e) => setData({...data, type: e.target.value})}
                            >
                                <MenuItem value={"WebsiteSpider"}>Website Spider</MenuItem>
                                <MenuItem value={"WebpageSpider"}>Webpage Spider</MenuItem>
                            </Select>
                        </Grid>     
                    </Grid>
                    {
                      data.type == "WebsiteSpider" && (
                        <Grid container spacing={0} sx={{ flexGrow: 0 }}>                                     
                            <Grid xs={4}>
                                <TextField
                                    label="Graph Depth"
                                    name="graph Depth"
                                    margin="normal"
                                    type="number"
                                    defaultValue={data.graphdeep}
                                    value={data.graphdeep}
                                    onChange={(e) => setData({...data, graphdeep: e.target.value})}
                                />    
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    label="Delay"
                                    name="delay"
                                    margin="normal"
                                    type="number"
                                    defaultValue={data.delay}
                                    value={data.delay}
                                    onChange={(e) => setData({...data, delay: e.target.value})}
                                />  
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    label="Max Thread"
                                    name="max Thread"
                                    margin="normal"
                                    type="number"
                                    defaultValue={data.maxThread}
                                    value={data.maxThread}
                                    onChange={(e) => setData({...data, maxThread: e.target.value})}
                                />  
                            </Grid>
                        </Grid>
                      )
                    }

                </form>
            </Box>
        </Modal>
    );
}
