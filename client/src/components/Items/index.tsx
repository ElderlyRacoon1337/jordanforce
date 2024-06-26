import React, { useEffect, useState } from "react";
import styles from "./Items.module.scss";
import { Item } from "../Item";
import { Button, Icon, Menu, MenuItem } from "cutie-ui";
import { useRouter } from "next/router";
import { Api } from "@/utils/api";
import { models } from "@/data/models";
import Image from "next/image";

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
    updateQueryParams("sortBy", sortBy);
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

  const sortByToRus = (sortBy: string) => {
    let ruSortBy = "Сортировка по";
    switch (sortBy) {
      case "relevance":
        ruSortBy = "Релевантности";
        break;
      case "popularity":
        ruSortBy = "Популярности";
        break;
      case "priceASC":
        ruSortBy = "Возрастанию цены";
        break;
      case "priceDESC":
        ruSortBy = "Убыванию цены";
        break;
      default:
        break;
    }
    return ruSortBy;
  };

  if (!sneakers) return;
  if (!sneakersLocal) return;

  return (
    <div className={styles.root}>
      <div className="container">
        <ul className={styles.models}>
          {models.map((model) => {
            return (
              <li
                onClick={() => {
                  handleModelChange(model);
                }}
              >
                {model}
              </li>
            );
          })}
        </ul>
        <figure className={styles.banner}></figure>
        <div className={styles.menu}>
          {/* <Menu
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
                handleModelChange("Nike Air Jordan 4");
              }}
            >
              Nike Jordan 4
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleModelChange("Nike Air Jordan 1 Low");
              }}
            >
              Nike Jordan 1 Low
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleModelChange("Nike Air Jordan 1 Mid");
              }}
            >
              Nike Jordan 1 Mid
            </MenuItem>
            <MenuItem
              divider
              onClick={() => {
                handleClose();
                handleModelChange("Nike Air Jordan 1 High");
              }}
            >
              Nike Jordan 1 High
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleModelChange("Nike Air Air Force 1 Low");
              }}
            >
              Nike Air Force 1 Low
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleModelChange("Nike  Air Force 1 Mid");
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
          </Menu> */}
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
                handleSortByChange("relevance");
              }}
            >
              Релевантности
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseSort();
                handleSortByChange("popularity");
              }}
            >
              Популярности
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseSort();
                handleSortByChange("priceASC");
              }}
            >
              Возростанию цены
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseSort();
                handleSortByChange("priceDESC");
              }}
            >
              Убыванию цены
            </MenuItem>
          </Menu>
          <Button
            // variant="outlined4"
            color="textPrimary"
            className={styles.button}
            onClick={handleClickSort}
            endIcon={
              openSort ? (
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </Icon>
              ) : (
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Icon>
              )
            }
          >
            {sortByToRus(sortBy)}
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
