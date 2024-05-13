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
import Chip from '@mui/material/Chip';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SpiderCreateModal(prop) {
    const [spiderData, setSpiderData] = useState({
      "type": "WebsiteSpider",
      "url": "",
      "delay": 2,
      "graphdeep": 3,
      "maxThread": 1,
      "keyword": [],
      "filetype": [],
    })

    const profile = JSON.parse(localStorage.getItem("profile"))

    const { data } = useQuery({
        queryKey: ["keyword"],
        queryFn: () => getKeyword({ page: 0, keywordPerPage: 100 }),
        keepPreviousData: true,
    });
    const keywordData = data?.data?.detail ? data?.data?.detail : []

    const handleCreateWebpageSpider = async () => {
      const response = await createWebpageSpider(
        profile.id,
        spiderData
      )

      if (response.status == 201) {
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: "true",
        }).fire({
            icon: "success",
            title: "\n\nCreate webpage spider successfully. Please refresh page.",
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
            title: "\n\nCreate webpage spider failed"
        });
      }
    }

    const handleCreateWebsiteSpider = async () => {
      const response = await createWebsiteSpider(
        profile.id,
        spiderData
      )

      if (response.status == 201) {
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: "true",
        }).fire({
            icon: "success",
            title: "\n\nCreate website spider successfully. Please refresh page.",
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
            title: "\n\nCreate website spider failed"
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
                              () => spiderData.type == "WebsiteSpider" ? handleCreateWebsiteSpider() : handleCreateWebpageSpider()
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
                                defaultValue={spiderData.url}
                                value={spiderData.url}
                                onChange={(e) => setSpiderData({...spiderData, url: e.target.value})}
                            />   
                        </Grid>     
                        <Grid xs={4}>
                            <InputLabel>Type</InputLabel> 
                            <Select
                                value={spiderData.type}
                                label="Type"
                                onChange={(e) => setSpiderData({...spiderData, type: e.target.value})}
                            >
                                <MenuItem value={"WebsiteSpider"}>Website Spider</MenuItem>
                                <MenuItem value={"WebpageSpider"}>Webpage Spider</MenuItem>
                            </Select>
                        </Grid>  
                        <Grid xs={6}>
                            <InputLabel>Keyword</InputLabel> 
                            <Select
                                multiline
                                multiple
                                displayEmpty
                                value={spiderData.keyword}
                                label="Type"
                                onChange={(e) => setSpiderData({...spiderData, keyword: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value})}
                                MenuProps={MenuProps}
                                renderValue={(selected) => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                      <Chip key={value} label={data?.data?.detail[value]?.name} />
                                    ))}
                                  </Box>
                                )}
                            >
                              {data?.data?.detail.map((word) => (
                                <MenuItem
                                  key={word.id}
                                  value={word.id}
                                >
                                  {word.name}
                                </MenuItem>
                              ))}
                            </Select>
                        </Grid>       
                    </Grid>
                    {
                      spiderData.type == "WebsiteSpider" && (
                        <Grid container spacing={0} sx={{ flexGrow: 0 }}>                                     
                            <Grid xs={4}>
                                <TextField
                                    label="Graph Depth"
                                    name="graph Depth"
                                    margin="normal"
                                    type="number"
                                    defaultValue={spiderData.graphdeep}
                                    value={spiderData.graphdeep}
                                    onChange={(e) => setSpiderData({...spiderData, graphdeep: e.target.value})}
                                />    
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    label="Delay"
                                    name="delay"
                                    margin="normal"
                                    type="number"
                                    defaultValue={spiderData.delay}
                                    value={spiderData.delay}
                                    onChange={(e) => setSpiderData({...spiderData, delay: e.target.value})}
                                />  
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    label="Max Thread"
                                    name="max Thread"
                                    margin="normal"
                                    type="number"
                                    defaultValue={spiderData.maxThread}
                                    value={spiderData.maxThread}
                                    onChange={(e) => setSpiderData({...spiderData, maxThread: e.target.value})}
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
