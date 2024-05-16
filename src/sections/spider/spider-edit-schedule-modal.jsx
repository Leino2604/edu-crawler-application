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
import { updateSpiderBasicSettingById, updateSpiderUrlById, scheduleSpiderByID } from "../../services/spider.api";
import Swal from "sweetalert2";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "20%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function SpiderEditScheduleModal(prop) {
    const { Id, Type, Url, Status, Delay, GraphDeep, MaxThread, Keyword, FileType, IsSchedule, ScheduleTime} = prop.article;

    const [data, setData] =  useState({
      "Url": Url,
      "Type": Type,
      "GraphDeep": GraphDeep,
      "MaxThread": MaxThread,
      "Delay": Delay,
      "IsSchedule": IsSchedule,
      "ScheduleTime": ScheduleTime ? ScheduleTime.split(":")[0] : 0
    })

    const updateSpider = async () => {
      const response2 = await scheduleSpiderByID(
        Id, 
        data
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
            title: "\n\nSchedule spider " + Id + " successfully. Please refresh page.",
        });
      } 
      if (response2.status != 200) {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: "true",
        }).fire({
            icon: "error",
            title: "\n\nSchedule spider failed"
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
                            Schedule Spider {Id}
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

                        <Grid xs={2}>
                            <InputLabel>Is Schedule</InputLabel> 
                            <Select
                                defaultValue={IsSchedule}
                                value={data.IsSchedule}
                                label="IsSchedule"
                                onChange={(e) => setData({...data, IsSchedule: e.target.value})}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </Grid> 
                        {
                          data.IsSchedule == true && (
                            <Grid xs={4}>
                                <TextField
                                    label="Schedule Time (24 Hours)"
                                    name="scheduleTime"
                                    margin="normal"
                                    defaultValue={ScheduleTime ? parseInt(ScheduleTime.split(":")[0]) : 0}
                                    value={data.ScheduleTime}
                                    onChange={(e) => setData({...data, ScheduleTime: e.target.value})}
                                    type="Number"
                                />    
                            </Grid>    
                          )
                        } 
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
}
