import { Slider, Typography } from "@mui/material";
import { useState } from "react";
import styles from './SliderDate.module.scss'
import { useFilterContext } from "../../../context/FilterContext";

export default function SliderDate() {
    const { filterState, dispatch } = useFilterContext()

    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch({
            type: 'setData',
            payload: newValue as number[]
        })
    }

    return(
        <div className={styles.container}>
            <Typography id="input-slider" gutterBottom className={styles.title}>
                Год релиза:
            </Typography>

            <Slider
                value={filterState.date}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={1984} 
                max={2024} 
            />
        </div>
    )
}