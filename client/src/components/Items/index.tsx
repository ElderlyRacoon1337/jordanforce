import React, { useState } from "react";
import styles from "./Items.module.scss";
import { Item } from "../Item";
import { Button, Menu, MenuItem } from "cutie-ui";

export const Items = ({ sneakers }: any) => {
  const [ancorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(ancorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const [ancorElSort, setAnchorElSort] = useState<HTMLElement | null>(null);
  const openSort = Boolean(ancorElSort);
  const handleCloseSort = () => {
    setAnchorElSort(null);
  };
  const handleClickSort = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorElSort(e.currentTarget);
  };
  if (!sneakers) return;

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.menu}>
          <Menu
            className={styles.menu_el}
            fullWidth
            open={open}
            anchorEl={ancorEl}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Nike Jordan 4 low</MenuItem>
            <MenuItem onClick={handleClose}>Nike Jordan 4 mid</MenuItem>
            <MenuItem onClick={handleClose}>Nike Jordan 4 high</MenuItem>
            <MenuItem onClick={handleClose}>Nike Jordan 1 low</MenuItem>
            <MenuItem onClick={handleClose}>Nike Jordan 1 mid</MenuItem>
            <MenuItem onClick={handleClose}>Nike Jordan 1 high</MenuItem>
            <MenuItem divider onClick={handleClose}>
              Nike Air Force 1
            </MenuItem>
            <MenuItem onClick={handleClose}>Все</MenuItem>
          </Menu>
          <Menu
            className={styles.menu_el}
            fullWidth
            open={openSort}
            anchorEl={ancorElSort}
            onClose={handleCloseSort}
          >
            <MenuItem onClick={handleCloseSort}>Релевантности</MenuItem>
            <MenuItem onClick={handleCloseSort}>Популярности</MenuItem>
            <MenuItem onClick={handleCloseSort}>Возростанию цены</MenuItem>
            <MenuItem onClick={handleCloseSort}>Убыванию цены</MenuItem>
          </Menu>
          <p>Модель:</p>
          <Button
            variant="contained"
            color="#2b2b2b"
            className={styles.button}
            onClick={handleClick}
          >
            Все
          </Button>
          <p>Сортировка по:</p>
          <Button
            variant="contained"
            color="#2b2b2b"
            className={styles.button}
            onClick={handleClickSort}
          >
            Релевантности
          </Button>
        </div>
        <div className={styles.items}>
          {sneakers.map((el, i) => {
            return <Item key={i} title={el.title} image={el.imageUrl} />;
          })}
        </div>
      </div>
    </div>
  );
};
