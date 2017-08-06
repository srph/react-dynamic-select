import React, {Component} from 'react';
import T from 'prop-types';

export default class DynamicSelect extends Component {
  state = {
    loading: false,
    options: [],
    error: ''
  };

  componentDidMount() {
    // We'll stop the initial loading if the variable
    // hasn't been filled yet. (Which is a blank string if there's a variable)
    if (typeof this.props.variable === 'string' && !this.props.variable.length) {
      return;
    }

    this.options(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.variable !== nextProps.variable &&
      typeof nextProps.variable === 'string' &&
      !nextProps.variable.length ) {
      this.options(nextProps);
    }
  }

  render() {
    const {loading, error, options} = this.state;

    let props = {...this.props};
    delete props.loading;
    delete props.options;
    delete props.variable;
    delete props.placeholder;

    return (
      <select {...props}>
        {loading && <option value="0">{this.props.loading.replace(':variable', this.props.variable)}</option>}
        {error.length && <option value="0">{error}</option>}
        {!error.length && !loading && <option value="0">{this.props.placeholder}</option>}

        {options.map((option, i) =>
          <option value={option.value} key={option.value}>{option.label}</option>
        )}
      </select>
    );
  }

  options(props) {
    if (this.state.loading) {
      return;
    }

    this.setState({ loading: true, error: '' });

    this.props.options()
      .then((options) => {
        this.setState({
          options,
          loading: false
        });
      }, (err) => {
        this.setState({
          loading: false,
          error: 'Oops! An unexpected error occurred.'
        });
      });
  }
}

DynamicSelect.propTypes = {
  placeholder: T.string,
  loading: T.string,
  variable: T.string,
  options: T.func.isRequired
};

DynamicSelect.defaultProps = {
  placeholder: 'Select something...',
  loading: 'Loading...'
};