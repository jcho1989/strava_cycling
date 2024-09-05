 import {useCallback, useEffect, useState} from 'react';
 import _ from 'lodash';
 import PropTypes from 'prop-types';
 

 function useBaseReadHook(config = {}) {
   const {
     apiCall,
     pathParams,
     params,
     data,
     onSuccess,
     onError
   } = config || {};
 
   const [loading, setLoading] = useState(false);
   const [results, setResults] = useState(null);
   const [error, setError] = useState(undefined);
   const [abortController, setAbortController] = useState(null);
 
   const refresh = useCallback(() => {
     if (!_.isEmpty(config)) {
       abortController?.abort?.();
 
       setLoading(true);
 
       const _abortController = new AbortController();
       setAbortController(_abortController);
 
       const configData = {
         signal: _abortController.signal,
         pathParams,
         params,
         data
       };
 
       apiCall(configData)
         .then((response) => {
           const data = _.get(response, ['data']);
           setResults(data);
           setError(undefined);
           setLoading(false);
           onSuccess?.();
         })
         .catch((err) => {
           if (err?.message === 'canceled') {
             return;
           }
           console.error(err);
           setError(err);
           setResults(null);
           setLoading(false);
           onError?.(err);
         })
     } else {
       setResults(null);
       setError(undefined);
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [config]);
 
  
 
   useEffect(() => {
     refresh();
   }, [refresh]);
 
   return {
     loading,
     results,
     error,
     sync: useCallback(() => setTimeout(() => refresh(), 100), [refresh])
   };
 }
 
 useBaseReadHook.propTypes = {
   apiCall: PropTypes.func.isRequired,
   pathParams: PropTypes.object,
   params: PropTypes.object,
   data: PropTypes.object,
   error: PropTypes.object,
   onSuccess: PropTypes.func,
   onError: PropTypes.func
 };
 
 export default useBaseReadHook;
 