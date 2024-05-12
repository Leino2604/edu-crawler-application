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
import { updateSpiderBasicSettingById, updateSpiderUrlById } from "../../services/spider.api";
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

export default function SpiderEditBasicModal(prop) {
    const { Id, Type, Url, Status, Delay, GraphDeep, MaxThread, Keyword, FileType, LastRunDate, LastEndDate, RunTime, TotalPage} = prop.article;
    const KeywordList = Keyword ? Keyword.map((data) => data.Value) : []
    const FileTypeList = FileType ? FileType.map((data) => data.Value) : []

    const [data, setData] =  useState({
      "Url": Url,
      "Type": Type,
      "GraphDeep": GraphDeep,
      "MaxThread": MaxThread,
      "Delay": Delay
    })

    const updateSpider = async () => {
      if (Type == "WebsiteSpider") {
        const response = await updateSpiderBasicSettingById(
          { 
            "spider_id": Id, 
            "delay": data.Delay ? parseInt(data.Delay) : Delay,
            "graph_deep": data.GraphDeep ? parseInt(data.GraphDeep) : GraphDeep,
            "max_thread": data.MaxThread ? parseInt(data.MaxThread) : MaxThread
          }
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
              title: "\n\nUpdate spider " + Id + " successfully. Please refresh page.",
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
              title: "\n\nUpdate failed"
          });
        }
      }

      const response2 = await updateSpiderUrlById(
        Id, 
        data.Url ? data.Url : Url
      )

      if (response2.status == 200) {
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: "true",
        }).fire({
            icon: "success",
            title: "\n\nUpdate spider " + Id + " successfully. Please refresh page.",
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
            title: "\n\nUpdate failed"
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
                            Spider {Id}
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Button
                            variant="contained"
                            color="inherit"
                            startIcon={<Iconify icon="eva:brush-outline" />}
                            onClick={
                              () => updateSpider()
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
                                label="Url"
                                name="url"
                                margin="normal"
                                defaultValue={Url}
                                value={data.Url}
                                onChange={(e) => setData({...data, Url: e.target.value})}
                            />   
                        </Grid>    
                        <Grid xs={4}>
                            <TextField
                                label="Type"
                                name="type"
                                margin="normal"
                                defaultValue={Type}
                                value={data.Type}
                                onChange={(e) => setData({...data, Type: e.target.value})}
                                disabled
                            />    
                        </Grid>    
                    </Grid>
                    {
                      Type == "WebsiteSpider" && (
                        <Grid container spacing={0} sx={{ flexGrow: 0 }}>                                     
                            <Grid xs={4}>
                                <TextField
                                    label="Graph Depth"
                                    name="graph Depth"
                                    margin="normal"
                                    type="number"
                                    defaultValue={GraphDeep}
                                    value={data.GraphDeep}
                                    onChange={(e) => setData({...data, GraphDeep: e.target.value})}
                                />    
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    label="Delay"
                                    name="delay"
                                    margin="normal"
                                    type="number"
                                    defaultValue={Delay}
                                    value={data.Delay}
                                    onChange={(e) => setData({...data, Delay: e.target.value})}
                                />  
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    label="Max Thread"
                                    name="max Thread"
                                    margin="normal"
                                    type="number"
                                    defaultValue={MaxThread}
                                    value={data.MaxThread}
                                    onChange={(e) => setData({...data, MaxThread: e.target.value})}
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
