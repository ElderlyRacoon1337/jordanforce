import React, { useEffect, useState } from "react";
import styles from "./Items.module.scss";
import { Item } from "../Item";
import { Button, Menu, MenuItem } from "cutie-ui";
import { useRouter } from "next/router";
import { Api } from "@/utils/api";

export const Items = ({ sneakers }: any) => {
  const router = useRouter();
  const { sortBy, model, search } = router.query;
  const [sneakersLocal, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [router.query]);

  const fetchProducts = async () => {
    try {
      const response = await Api().sneakers.getAll(sortBy, model, search);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const updateQueryParams = (key, value) => {
    const newQuery = { ...router.query, [key]: value };
    router.push({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    });
  };

  const handleSortByChange = (sortBy: string) => {
    let enSortBy = "";

    switch (sortBy) {
      case "Релевантности":
        enSortBy = "relevance";
        break;
      case "Популярности":
        enSortBy = "popularity";
        break;
      case "Возрастанию цены":
        enSortBy = "priceASC";
        break;
      case "Убыванию цены":
        enSortBy = "priceDESC";
        break;
      default:
        break;
    }
    updateQueryParams("sortBy", enSortBy);
  };

  const handleModelChange = (model: string) => {
    updateQueryParams("model", model);
  };

  const handlesearchChange = (e) => {
    const value = e.target.value;
    updateQueryParams("search", value);
  };

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
  if (!sneakersLocal) return;

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
            <MenuItem
              divider
              onClick={() => {
                handleClose();
                handleModelChange("Nike Jordan 4");
              }}
            >
              Nike Jordan 4
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleModelChange("Nike Jordan 1 Low");
              }}
            >
              Nike Jordan 1 Low
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleModelChange("Nike Jordan 1 Mid");
              }}
            >
              Nike Jordan 1 Mid
            </MenuItem>
            <MenuItem
              divider
              onClick={() => {
                handleClose();
                handleModelChange("Nike Jordan 1 High");
              }}
            >
              Nike Jordan 1 High
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleModelChange("Nike Air Force 1 Low");
              }}
            >
              Nike Air Force 1 Low
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleModelChange("Nike Air Force 1 Mid");
              }}
            >
              Nike Air Force 1 Mid
            </MenuItem>
            <MenuItem
              divider
              onClick={() => {
                handleClose();
                handleModelChange("Nike Air Force 1 High");
              }}
            >
              Nike Air Force 1 High
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleModelChange("Nike Dunk Low");
              }}
            >
              Nike Dunk Low
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleModelChange("Nike Dunk Mid");
              }}
            >
              Nike Dunk Mid
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleModelChange("Nike Dunk High");
              }}
            >
              Nike Dunk High
            </MenuItem>
          </Menu>
          <Menu
            className={styles.menu_el}
            fullWidth
            open={openSort}
            anchorEl={ancorElSort}
            onClose={handleCloseSort}
          >
            <MenuItem
              onClick={() => {
                handleCloseSort();
                handleSortByChange("Релевантности");
              }}
            >
              Релевантности
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseSort();
                handleSortByChange("Популярности");
              }}
            >
              Популярности
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseSort();
                handleSortByChange("Возрастанию цены");
              }}
            >
              Возростанию цены
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseSort();
                handleSortByChange("Убыванию цены");
              }}
            >
              Убыванию цены
            </MenuItem>
          </Menu>
          <p>Модель:</p>
          <Button
            variant="outlined"
            color="textPrimary"
            className={styles.button}
            onClick={handleClick}
          >
            {model}
          </Button>
          <p>Сортировка по:</p>
          <Button
            variant="outlined"
            color="textPrimary"
            className={styles.button}
            onClick={handleClickSort}
          >
            {sortBy}
          </Button>
        </div>
        <div className={styles.items}>
          {sneakersLocal.map((el: any, i: number) => {
            return (
              <Item
                key={i}
                title={el.title}
                images={el.images}
                id={el._id}
                price={el.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
