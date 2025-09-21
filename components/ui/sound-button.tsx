"use client"

import React from 'react';
import { Button as ShadcnButton, ButtonProps } from '@/components/ui/button';
import { useSound } from '@/components/sound-provider';

const SoundButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const { playClickSound, isInitialized } = useSound();

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            playClickSound();
            if (props.onClick) {
                props.onClick(e);
            }
        };

        return <ShadcnButton ref={ref} {...props} onClick={handleClick} />;
    }
);

SoundButton.displayName = 'SoundButton';

export { SoundButton };