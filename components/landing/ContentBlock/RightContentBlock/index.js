// import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import SvgImage from '~/components/common/SvgImage';

import * as S from './style';

const RightContentBlock = ({ title, content, imgName }) => {
  return (
    <S.RightContentBlock>
      <Row justify="center" align="middle" gutter={20}>
        <Col xs={{ span: 16 }} lg={{ span: 12 }}>
          <SvgImage name={imgName} width="100%" heigth="100%" />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <S.ContentWrapper>
            <h1>{title}</h1>
            <h3>{content}</h3>
          </S.ContentWrapper>
        </Col>
      </Row>
    </S.RightContentBlock>
  );
};

// RightContentBlock.propTypes = {
//   title: PropTypes.string.isRequired,
//   content: PropTypes.string.isRequired,
//   imgName: PropTypes.string.isRequired,
// };

export default RightContentBlock;
