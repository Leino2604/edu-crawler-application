import { useEffect, useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

export default function SpiderScheduleModal(props) {
    const [isSchedule, setIsSchedule] = useState(false);
    const [scheduleTime, setScheduleTime] = useState(0);

    useEffect(() => {
        if (props) {
            setIsSchedule(props?.article?.IsSchedule);
            setScheduleTime(
                props?.article?.ScheduleTime
                    ? props?.article?.ScheduleTime.split(":")[0]
                    : 0
            );
        }
    }, [props?.article]);

    return (
        <Dialog
            {...props}
            fullWidth
            onClose={() => {
                props.onClose();
                setIsSchedule(props?.article?.IsSchedule);
                setScheduleTime(
                    props?.article?.ScheduleTime
                        ? props?.article?.ScheduleTime.split(":")[0]
                        : 0
                );
            }}
            PaperProps={{
                component: "form",
                onSubmit: (event) => {
                    event.preventDefault();
                    props.handleScheduleSpider({
                        id: props?.article?.Id,
                        body: {
                            is_scheduled: isSchedule,
                            scheduled_time: scheduleTime,
                        },
                    });
                    props.refetch();
                    props.onClose();
                },
            }}
        >
            <DialogTitle>Schedule Spider</DialogTitle>
            <DialogContent>
                <TextField
                    select
                    autoFocus
                    fullWidth
                    id="isSchedule"
                    name="isSchedule"
                    label="Is Schedule"
                    value={isSchedule}
                    sx={{ margin: "8px 0px" }}
                    onChange={(e) => setIsSchedule(e.target.value)}
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    type="number"
                    id="scheduleTime"
                    name="scheduleTime"
                    label="Schedule Time (24 Hours)"
                    disabled={isSchedule == false}
                    margin="normal"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        props.onClose();
                        setIsSchedule(props?.article?.IsSchedule);
                        setScheduleTime(
                            props?.article?.ScheduleTime
                                ? props?.article?.ScheduleTime.split(":")[0]
                                : 0
                        );
                    }}
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button type="submit" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
