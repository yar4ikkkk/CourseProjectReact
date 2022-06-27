import { FilterList } from "./FilterList";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters } from "../../redux/filters/selectors";
import { CLEAR_FORM, getFilters } from "../../redux/filters/actions";
import { useEffect } from "react";
import classes from './Sidebar.module.scss'

export function Sidebar() {
  const filtersState = useSelector(selectFilters);
  const filterListsProps = Object.entries(filtersState);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilters());
  }, []);

  return (
    <aside className={classes.sidebar} data-element="body">
      <div className={classes['sidebar__head']}>
        <h3>Filters</h3>
      </div>
      <form className={classes['sidebar__form']} data-element="form">
        {filterListsProps.map((data) => (
          <FilterList key={data[0]} title={data[0]} filters={data[1]} />
        ))}
      </form>
      <button
        className="btn btn--large-font btn--green btn--full-width"
        data-element="button"
        onClick={() => dispatch({ type: CLEAR_FORM })}
      >
        CLEAR ALL FILTERS
      </button>
    </aside>
  );
}
