import React from 'react';
import { Button } from 'react-bootstrap';
const Product = (props) => {
    const { name, skuId, description, price, handleActionBtnClick } = props;
    return (
        <React.Fragment>
            <div className="product-item">
                <div className="product" data-skuid={skuId}>
                    <div className="name">{name}</div>
                    <div className="description">{description}</div>
                    <div>{price}</div>
                </div>
                <div className="buttons">
                    <div className="btn">
                        <Button
                            variant="info"
                            type="submit"
                            size="sm"
                            onClick={() => handleActionBtnClick('view', skuId)}
                        >
                            View
            </Button>
                    </div>
                    <div className="btn">
                        <Button
                            variant="secondary"
                            type="submit"
                            size="sm"
                            onClick={() => handleActionBtnClick('edit', skuId)}
                        >
                            Edit
            </Button>
                    </div>
                    <div className="btn">
                        <Button
                            variant="danger"
                            type="submit"
                            size="sm"
                            onClick={() => handleActionBtnClick('delete', skuId, name)}
                        >
                            Delete
            </Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Product;