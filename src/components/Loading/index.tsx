/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-24 15:51:11
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-09-08 19:56:41
 * @Description:loading
 */
import React from 'react';
import './index.scss';
// import LoadingSVG from '@/assets/svg/loading.svg';
interface ILoading {
  loading: boolean;
  [key: string]: any;
}
const Loading: React.FC<ILoading> = (props: any) => {
  const { loading, children } = props;
  return (
    <div className={`th-loading ${!loading && 'hidden'}`}>
      <div className='th-loading-main'>
        <svg width='50px' height='50px'>
          <circle
            cx='25'
            cy='25'
            r='20'
            fill='transparent'
            strokeWidth='3'
            strokeDasharray='31.415, 31.415'
            stroke='#02bcfe'
            strokeLinecap='round'
          >
            <animateTransform
              attributeName='transform'
              type='rotate'
              values='0, 25 25;360, 25 25'
              dur='1.5s'
              repeatCount='indefinite'
            />
            <animate
              attributeName='stroke'
              values='#02bcfe;#3be6cb;#02bcfe'
              dur='3s'
              repeatCount='indefinite'
            />
          </circle>

          <circle
            cx='25'
            cy='25'
            r='10'
            fill='transparent'
            strokeWidth='3'
            strokeDasharray='15.7, 15.7'
            stroke='#3be6cb'
            strokeLinecap='round'
          >
            <animateTransform
              attributeName='transform'
              type='rotate'
              values='360, 25 25;0, 25 25'
              dur='1.5s'
              repeatCount='indefinite'
            />
            <animate
              attributeName='stroke'
              values='#3be6cb;#02bcfe;#3be6cb'
              dur='3s'
              repeatCount='indefinite'
            />
          </circle>
        </svg>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Loading;
