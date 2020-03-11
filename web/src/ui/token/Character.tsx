import React, { forwardRef, memo } from "react";
import { Card, CardMedia, CardProps, makeStyles } from "@material-ui/core";
import { Icon } from "../icons";
import { GRID_SIZE_PX } from "../../config";
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles({
  media: {
    margin: "20%",
    width: "60%",
    height: "60%"
  }
});

export interface Size {
  height: number;
  width: number;
}

interface CharacterProps {
  isDragging: boolean;
  icon: Icon;
}

type Props = CharacterProps & CardProps;

const Character: React.FC<Props> = memo(
  forwardRef(({ icon, isDragging, ...cardProps }, ref) => {
    const classes = useStyles();

    return (
      <Card
        {...cardProps}
        ref={ref}
        raised={isDragging}
        style={{
          width: GRID_SIZE_PX,
          height: GRID_SIZE_PX,
          zIndex: isDragging ? 1000 : "auto",
          position: isDragging ? "relative" : "relative",
          ...cardProps.style
        }}
      >
        <CardMedia
          className={classes.media}
          image={icon.img}
          draggable={false}
        />
        <div
          style={{
            backgroundColor: "red",
            width: 6,
            height: 6,
            position: "absolute",
            borderRadius: 3,
            top: "calc(100% - 6px)",
            left: "calc(100% - 6px)"
          }}
        >
        </div>
      </Card>
    );
  })
);

export default Character;
