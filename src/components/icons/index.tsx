import * as React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect, SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
  color?: string;
  size?: number | string;
  focused?: boolean;
}

export const MapPinIcon = ({ size = 16, color = '#99A1AF', focused, ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill={focused ? color : 'none'} {...props}>
    <Path
      d="M12.6668 9.33333C13.6602 8.36 14.6668 7.19333 14.6668 5.66667C14.6668 4.69421 14.2805 3.76158 13.5929 3.07394C12.9053 2.38631 11.9726 2 11.0002 2C9.82683 2 9.00016 2.33333 8.00016 3.33333C7.00016 2.33333 6.1735 2 5.00016 2C4.0277 2 3.09507 2.38631 2.40744 3.07394C1.7198 3.76158 1.3335 4.69421 1.3335 5.66667C1.3335 7.2 2.3335 8.36667 3.3335 9.33333L8.00016 14L12.6668 9.33333Z"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SearchIcon = ({ size = 16, color = '#99A1AF', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 14L11.1333 11.1333"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HomeIcon = ({ size = 20, color = '#99A1AF', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5"
      stroke={color}
      strokeWidth={2.08333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.5 8.33322C2.49994 8.09078 2.55278 7.85124 2.65482 7.63132C2.75687 7.4114 2.90566 7.21639 3.09083 7.05989L8.92417 2.06073C9.22499 1.80648 9.60613 1.66699 10 1.66699C10.3939 1.66699 10.775 1.80648 11.0758 2.06073L16.9092 7.05989C17.0943 7.21639 17.2431 7.4114 17.3452 7.63132C17.4472 7.85124 17.5001 8.09078 17.5 8.33322V15.8332C17.5 16.2753 17.3244 16.6992 17.0118 17.0117C16.6993 17.3243 16.2754 17.4999 15.8333 17.4999H4.16667C3.72464 17.4999 3.30072 17.3243 2.98816 17.0117C2.67559 16.6992 2.5 16.2753 2.5 15.8332V8.33322Z"
      stroke={color}
      strokeWidth={2.08333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HeartIcon = ({ size = 20, color = '#99A1AF', focused, ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill={focused ? color : 'none'} {...props}>
    <Path
      d="M15.8332 11.6667C17.0748 10.45 18.3332 8.99167 18.3332 7.08333C18.3332 5.86776 17.8503 4.70197 16.9907 3.84243C16.1312 2.98289 14.9654 2.5 13.7498 2.5C12.2832 2.5 11.2498 2.91667 9.99984 4.16667C8.74984 2.91667 7.7165 2.5 6.24984 2.5C5.03426 2.5 3.86847 2.98289 3.00893 3.84243C2.14939 4.70197 1.6665 5.86776 1.6665 7.08333C1.6665 9 2.9165 10.4583 4.1665 11.6667L9.99984 17.5L15.8332 11.6667Z"
      stroke={color}
      strokeWidth={2.08333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HeartPulseIcon = ({ size = 32, color = '#99A1AF', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      d="M25.3332 18.6667C27.3198 16.72 29.3332 14.3867 29.3332 11.3333C29.3332 9.38841 28.5606 7.52315 27.1853 6.14788C25.81 4.77262 23.9448 4 21.9998 4C19.6532 4 17.9998 4.66667 15.9998 6.66667C13.9998 4.66667 12.3465 4 9.99984 4C8.05492 4 6.18965 4.77262 4.81439 6.14788C3.43912 7.52315 2.6665 9.38841 2.6665 11.3333C2.6665 14.4 4.6665 16.7333 6.6665 18.6667L15.9998 28L25.3332 18.6667Z"
      stroke={color}
      strokeWidth={2.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.0002 17.3332L14.6668 15.9998L17.3335 13.3332L13.3335 9.33317L16.0002 6.6665"
      stroke={color}
      strokeWidth={2.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ShuffleIcon = ({ size = 20, color = '#99A1AF', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
    <G clipPath="url(#clip0_filter)">
      <Path
        d="M15 11.6665L18.3333 14.9998L15 18.3332"
        stroke={color}
        strokeWidth={2.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 1.6665L18.3333 4.99984L15 8.33317"
        stroke={color}
        strokeWidth={2.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.6665 15.0001H3.31067C3.84941 15.0038 4.38102 14.8768 4.85996 14.6301C5.3389 14.3833 5.7509 14.0242 6.06067 13.5834L10.6057 6.41674C10.9154 5.97595 11.3274 5.61681 11.8064 5.37008C12.2853 5.12336 12.8169 4.9964 13.3557 5.00008H18.3332"
        stroke={color}
        strokeWidth={2.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.6665 5.00008H3.30984C3.93105 4.99576 4.54112 5.16512 5.0712 5.48906C5.60129 5.813 6.0303 6.27863 6.30984 6.83341"
        stroke={color}
        strokeWidth={2.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3333 15H13.2992C12.753 14.9944 12.2165 14.8547 11.737 14.5932C11.2575 14.3316 10.8496 13.9562 10.5492 13.5L10.25 13.125"
        stroke={color}
        strokeWidth={2.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_filter">
        <Rect width="20" height="20" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const ShareIcon = ({ size = 16, color = '#364153', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
    <G clipPath="url(#clip0_share)">
      <Path
        d="M12 5.3335C13.1046 5.3335 14 4.43807 14 3.3335C14 2.22893 13.1046 1.3335 12 1.3335C10.8954 1.3335 10 2.22893 10 3.3335C10 4.43807 10.8954 5.3335 12 5.3335Z"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 10C5.10457 10 6 9.10457 6 8C6 6.89543 5.10457 6 4 6C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10Z"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 14.6665C13.1046 14.6665 14 13.7711 14 12.6665C14 11.5619 13.1046 10.6665 12 10.6665C10.8954 10.6665 10 11.5619 10 12.6665C10 13.7711 10.8954 14.6665 12 14.6665Z"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.72656 9.00684L10.2799 11.6602"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.2732 4.33984L5.72656 6.99318"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_share">
        <Rect width="16" height="16" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
