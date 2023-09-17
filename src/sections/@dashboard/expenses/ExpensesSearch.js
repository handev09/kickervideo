import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

ExpensesSearch.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function ExpensesSearch({ expenses }) {
  console.log(expenses)
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={StyledPopper}
      options={expenses}
      getOptionLabel={(expense) => expense.expense_name}
      isOptionEqualToValue={(option, value) => option.expense_num === value.expense_num}
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
