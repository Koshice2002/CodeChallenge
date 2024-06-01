import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetchTokenPrices } from './services/tokenServices';
import { tokenIcons } from './services/tokenIcon';
import {
  Container,
  Title,
  SwapContainer,
  SwapItem,
  SwapIcon,
  SwapSelect,
  SwapInput,
  SwapArrow,
  SwapButton,
  ErrorText
} from './components/SwapFormStyle';

const SwapForm = () => {
  const [tokenPrices, setTokenPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTokenPrices = async () => {
      const prices = await fetchTokenPrices();
      setTokenPrices(prices);
      setLoading(false);
    };
    getTokenPrices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    fromCurrency: '',
    toCurrency: '',
    amount: '',
  };

  const validationSchema = Yup.object({
    fromCurrency: Yup.string().required('Required'),
    toCurrency: Yup.string().required('Required'),
    amount: Yup.number().required('Required').positive('Amount must be positive'),
  });

  // const handleSubmit = (values) => {
  //   const fromRate = tokenPrices[values.fromCurrency];
  //   const toRate = tokenPrices[values.toCurrency];
  //   const exchangeRate = fromRate / toRate;
  //   const result = values.amount * exchangeRate;
  //   alert(`You will receive ${result.toFixed(2)} ${values.toCurrency}`);
  // };

  return (
    <Container>
      <Title>Currency Swap</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <SwapContainer>
              <SwapItem>
                {values.fromCurrency && (
                  <SwapIcon
                    src={tokenIcons[values.fromCurrency]}
                    alt={values.fromCurrency}
                    width="50"
                  />
                )}
                <Field as={SwapSelect} name="fromCurrency">
                  <option value="">Select Currency</option>
                  {Object.keys(tokenIcons).map((token) => (
                    <option key={token} value={token}>
                      {token}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="fromCurrency" component={ErrorText} />
              </SwapItem>

              <SwapArrow>&#8594;</SwapArrow>

              <SwapItem>
                {values.toCurrency && (
                  <SwapIcon
                    src={tokenIcons[values.toCurrency]}
                    alt={values.toCurrency}
                    width="50"
                  />
                )}
                <Field as={SwapSelect} name="toCurrency">
                  <option value="">Select Currency</option>
                  {Object.keys(tokenIcons).map((token) => (
                    <option key={token} value={token}>
                      {token}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="toCurrency" component={ErrorText} />
              </SwapItem>
            </SwapContainer>

            <SwapContainer>
              <SwapItem>
                <label htmlFor="amount">From Amount</label>
                <Field
                  as={SwapInput}
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  onChange={(e) => {
                    const amount = e.target.value;
                    setFieldValue('amount', amount);
                    const fromRate = tokenPrices[values.fromCurrency];
                    const toRate = tokenPrices[values.toCurrency];
                    if (fromRate && toRate) {
                      const exchangeRate = fromRate / toRate;
                      setFieldValue('toAmount', amount * exchangeRate);
                    }
                  }}
                />
                <ErrorMessage name="amount" component={ErrorText} />
              </SwapItem>
              <SwapItem>
                <label htmlFor="toAmount">To Amount</label>
                <Field
                  as={SwapInput}
                  type="number"
                  name="toAmount"
                  placeholder="Amount"
                  value={values.toAmount}
                  disabled
                />
              </SwapItem>
            </SwapContainer>

            {/* <SwapButton type="submit">Swap</SwapButton> */}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SwapForm;
