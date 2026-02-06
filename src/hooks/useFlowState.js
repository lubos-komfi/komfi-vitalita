import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PAYMENT_OPTIONS } from '../data/constants';

export const useFlowState = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getStepFromPath = () => {
        const pathParts = location.pathname.split('/');
        if (pathParts[1] === 'flow' && pathParts[2]) {
            return parseInt(pathParts[2]);
        }
        return 0;
    };

    const [internalStep, setInternalStep] = useState(getStepFromPath());
    const [highestStepReached, setHighestStepReached] = useState(getStepFromPath());
    const [client, setClient] = useState({
        gender: 'female',
        age: 40,
        dynamicMarkers: true,
        showInternal: true,
        target: null // 'self' or 'parents'
    });
    const [registration, setRegistration] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [tempSelectedModules, setTempSelectedModules] = useState([]);
    const [paymentOption, setPaymentOption] = useState(PAYMENT_OPTIONS.upfront);
    const [hasKomfiMembership, setHasKomfiMembership] = useState(false);

    useEffect(() => {
        const currentStep = getStepFromPath();
        setInternalStep(currentStep);
        setHighestStepReached(prev => Math.max(prev, currentStep));
    }, [location.pathname]);

    const setStep = (newStep) => {
        navigate(`/flow/${newStep}`);
    };

    const toggleModule = (id) => {
        if (tempSelectedModules.includes(id)) {
            setTempSelectedModules(tempSelectedModules.filter(m => m !== id));
        } else {
            setTempSelectedModules([...tempSelectedModules, id]);
        }
    };

    const textVariant = client.target === 'parents' ? 'parents' : 'self';

    return {
        internalStep,
        highestStepReached,
        client,
        setClient,
        registration,
        setRegistration,
        tempSelectedModules,
        setTempSelectedModules,
        paymentOption,
        setPaymentOption,
        hasKomfiMembership,
        setHasKomfiMembership,
        setStep,
        toggleModule,
        textVariant,
    };
};
