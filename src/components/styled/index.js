import styled from 'styled-components';
import { green500 } from 'material-ui/styles/colors';

export const borderFormColor = '#cccccc';

/* Main styled components */

export const Container = styled.div`
  height: 100vh !important;
  margin: 0px !important;
  padding: 0px !important;
`;

export const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const MainHeader = styled.div`
  width: 100%;
  height: 100px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const MainFooter = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #ffffff;
  font-size: 18pt;
  font-weight: bold;
`;

/* Basic View for most pages */

export const CenterView = styled.div`
  width: 100%;
  height: ${props => (props.height || '400px')};
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

/* Image Containers */

export const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: ${props => props.size};
  height: ${props => props.size};

  & > img {
    height: 100%;
    width: auto;
    position: absolute;
    top: 0;
    left: 0;
    max-width: ${props => props.size};
    max-height: ${props => props.size};
  }
`;

/* Boxes - elements in rows. Flex-start box */

export const StartBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: ${props => props.marginTop || '0px'}
`;

export const ItemBox = styled(StartBox)`
  width: 400px;
  height: 32px;
  & > label {
    width: 100px !important;
  }
  & > div {
    width: 300px;
  }
  & > select {
    outline: 0;
  }
  & > textarea {
    width: 300px;
    outline: 0;
  }
`;

/* Space-between box */

export const BetweenBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'initial'};
  margin-top: ${props => props.marginTop || '0px'}
  margin-left: ${props => props.marginLeft || '0px'}
`;

export const HorizontalView = styled(BetweenBox)`
  position: relative;
  border-bottom: ${props => (!props.noborder ? '0.8px solid rgb(222, 222, 222)': '')};
  margin-left:  ${props => (!props.nomargin ? '2em': '0em')};
  padding-bottom: 1em;
  height: ${props => props.height || 'inherit'};
  max-width: ${props => props.maxWidth || '100%'};
`;

/* Box with center align-items */

export const CenterAlignBox = styled(BetweenBox)`
  align-items: center;
`;

export const ButtonsBox = styled(CenterAlignBox)`
  height: ${props => props.height || '50px'};
  position: ${props => props.inherit ? 'inherit' : 'absolute'};
  right: 0;
  top: ${props => props.top || '4em'};
`;

/* Wrappers: elements to decorate other elements */

export const ListWrapper = styled.div`
  position: relative;
  background-color: #ffffff !important;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: ${props => props.ml ? props.ml : ''};
`;
