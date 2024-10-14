import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mantine/core';
import { nprogress } from '@mantine/nprogress';
import { app } from '@/config';


export const Page = (props = {}) => {
  const {title, children, meta} = props
    useEffect(() => {
      nprogress.complete();
      return () => nprogress.start();
    }, []);

    return (
      <>
        <Helmet>
          <title>{`${title} | ${app.name}`}</title>
          {meta}
        </Helmet>

        <Box 
          // ref={ref}
          // {...other}
        >
          {children}
        </Box>
      </>
    );
  }


Page.propTypes = {
  children: PropTypes.node,
  meta: PropTypes.node,
  title: PropTypes.string
}