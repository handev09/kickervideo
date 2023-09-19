import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, TextField,Popper } from '@mui/material';
import Iconify from '../../../components/iconify';

const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

ExpensesSearch.propTypes = {
  expenses: PropTypes.array.isRequired,
};

export default function ExpensesSearch({ expenses, onSearch }) {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      options={expenses}
      getOptionLabel={(expense) => expense.expense_name}
      isOptionEqualToValue={(option, value) => option.expense_num === value.expense_num}
      onInputChange={(event, value) => {
        // Call the onSearch callback with the current search value
        onSearch(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search expenses..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
