import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  LOAD_PRODUCTS 
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filtered_products: [],
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    price: 0,
    min_price: 0,
    max_price: 0,
    shipping: false,
  },
}
https://docs.google.com/document/d/1HP0WdjKkGFzWWVT_FY9JmAKQlE1wINx5hyC521xMGIU/edit#heading=h.jjar8djmjnsy

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)


  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])
  
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])


  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }
  const updateSort = (e) => {
    // for demonstration
    // const name = e.target.name
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }
  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'color') {
      value = e.target.dataset.color
    }
    if (name === 'price') {
      value = Number(value)
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        updateFilters,
        clearFilters,
        setListView,
        updateSort
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}



https://docs.google.com/document/d/1HP0WdjKkGFzWWVT_FY9JmAKQlE1wINx5hyC521xMGIU/edit#heading=h.jjar8djmjnsy 

export default function Form() {
    const [firstName, setFirstName] = React.useState("")
    /**
     * Challenge: Track the applicant's last name as well
     */
    
    function handleChange(event) {
        setFirstName(event.target.value) // set  a value for setFirstName 
    }
    
    return (
        <form>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
            />
        </form>
    )
}

