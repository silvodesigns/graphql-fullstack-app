import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    initiateGetProducts,
    initiateDeleteProduct
} from '../actions/products';
import Product from './Product';
import Layout from './Layout';
class ProductsList extends React.Component {
    state = {
        products: [],
        errorMsg: '',
        isLoading: false,
        selectedProduct: null,
        reviews: null,
        isOpen: false
    };
    componentDidMount() {
        this.setState({ isLoading: true });
        this.props.dispatch(initiateGetProducts()).then(() => {
            this.setState({
                products: this.props.products,
                isLoading: false
            });
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.products.length !== this.props.products.length) {
            this.setState({ products: this.props.products });
        }
        if (prevProps.error !== this.props.error) {
            this.setState({ errorMsg: this.props.error });
        }
    }
    handleActionBtnClick = (type, skuId, name) => {
        if (type === 'edit') {
            this.props.history.push({
                pathname: `/edit/${skuId}`,
                state: { type, skuId }
            });
        } else if (type === 'view') {
            this.setState((prevState) => ({
                selectedProduct: prevState.products.find(
                    (product) => product.skuId === skuId
                )
            }));
        } else if (type === 'delete') {
            const shouldDelete = window.confirm(
                `Are you sure you want to delete product with name ${name}?`
            );
            if (shouldDelete) {
                this.setState({ errorMsg: '' });
                this.props.dispatch(initiateDeleteProduct(skuId));
            }
        }
    };
    render() {
        const { products, errorMsg, isLoading } = this.state;
        const propsToPass = {
            handleActionBtnClick: this.handleActionBtnClick
        };
        return (
            <Layout>
                {errorMsg !== '' && <p className="errorMsg">{errorMsg}</p>}
                {isLoading ? (
                    <p className="loading">Loading...</p>
                ) : (
                    <React.Fragment>
                        {!_.isEmpty(products) ? (
                            products.map((product, index) => {
                                return (
                                    <React.Fragment key={product.skuId}>
                                        {index === 0 ? (
                                            <React.Fragment>
                                                <div className="product product-header">
                                                    <div className="name">Product Name</div>
                                                    <div className="description">Description</div>
                                                    <div>Price</div>
                                                </div>
                                                <Product {...product} {...propsToPass} />
                                            </React.Fragment>
                                        ) : (
                                            <Product {...product} {...propsToPass} />
                                        )}
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <p className="no-result">
                                No products found. Please add some products.
                            </p>
                        )}
                    </React.Fragment>
                )}
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products,
        error: state.error
    };
};
export default connect(mapStateToProps)(ProductsList);