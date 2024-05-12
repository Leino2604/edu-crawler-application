import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from '@mui/base/Input';
import { Unstable_Grid as Grid } from '@mui/system';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Iconify from "../../components/iconify";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "75%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function SpiderDetailModal(prop) {
    const { Id, Type, Url, Status, Delay, GraphDeep, MaxThread, Keyword, FileType, LastRunDate, LastEndDate, RunTime, TotalPage} = prop.article;
    const KeywordList = Keyword ? Keyword.map((data) => data.Value) : []
    const FileTypeList = FileType ? FileType.map((data) => data.Value) : []

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
                        >
                            Edit
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
                        <Grid xs={12}>
                            <h3>Basic Configuration</h3>
                        </Grid>
                        <Grid xs={4}>
                            Url: 
                        </Grid>
                        <Grid xs={8}>
                            {Url}
                        </Grid>                        
                        <Grid xs={4}>
                            Type: 
                        </Grid>
                        <Grid xs={8}>
                            {Type}
                        </Grid>                        
                        <Grid xs={4}>
                            Status:
                        </Grid>
                        <Grid xs={8}>
                            {Status}
                        </Grid>  
                        {Type == "WebsiteSpider" && (
                          <>
                            <Grid xs={4}>
                                Delay: 
                            </Grid>
                            <Grid xs={8}>
                                {Delay} s
                            </Grid>                        
                            <Grid xs={4}>
                                Graph Depth: 
                            </Grid>
                            <Grid xs={8}>
                                {GraphDeep}
                            </Grid>                        
                            <Grid xs={4}>
                                Max Thread:
                            </Grid>
                            <Grid xs={8}>
                                {MaxThread}
                            </Grid>     
                          </>
                        )}
                 
                        <Grid xs={4}>
                            Allowed Keyword:
                        </Grid>
                        <Grid xs={8}>
                            {KeywordList.length == 0 ? "All" : KeywordList.join(', ')}
                        </Grid>
                        <Grid xs={4}>
                            Allowed File Type:
                        </Grid>
                        <Grid xs={8}>
                            {FileTypeList.length == 0 ? "All" : FileTypeList}
                        </Grid>
                        <Grid xs={4}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Crawl Rules
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                            <Button
                                variant="contained"
                                color="inherit"
                                startIcon={<Iconify icon="eva:alert-circle-outline" />}
                            >
                                Detail
                            </Button>
                        </Grid> 
                        <Grid xs={12}>
                            <h3>Spider Stats</h3>
                        </Grid>
                        <Grid xs={4}>
                            Last Run Date:
                        </Grid>
                        <Grid xs={8}>
                            {LastRunDate}
                        </Grid>
                        <Grid xs={4}>
                            Last End Date:
                        </Grid>
                        <Grid xs={8}>
                            {LastEndDate}
                        </Grid>
                        <Grid xs={4}>
                            Run Time:
                        </Grid>
                        <Grid xs={8}>
                            {RunTime} s
                        </Grid>
                        {Type == "WebsiteSpider" && (
                          <Grid xs={4}>
                              Total Page:
                          </Grid>
                        )}
                        {Type == "WebsiteSpider" && (
                          <Grid xs={8}>
                              {TotalPage}
                          </Grid>
                        )}
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
}