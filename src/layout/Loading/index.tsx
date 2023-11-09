import React from "react";
import styled, { keyframes } from "styled-components";
import { Center } from "@mantine/core";

interface LoadingProps {
    loading?: boolean;
    lightmode?: boolean;
}

const fadeIn = keyframes`
    99% {
        visibility: hidden;
    }
    100% {
        visibility: visible;
    }
`;
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const StyledLoading = styled.div<{ visible: boolean; light: boolean; }>`
    display: ${({ visible }) => (visible ? "grid" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    place-content: center;
    width: 100%;
    height: 100vh;
    text-align: center;
    z-index: 100;
    pointer-events: visiblePainted;
    cursor: wait;
    animation: 0.2s ${fadeIn};
    animation-fill-mode: forwards;
    visibility: hidden;
    > span {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 50px;
        height: 50px;
        background: ${({ light }) => (light ? "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAATlBMVEUAAAAjIyMjIyMjIyMjIyMjIyO/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3O/c3PtSVMtAAAAGXRSTlMAMgkfFSbzKReZeOcxs8WlUArh0rtEIXBmKM0UIAAAAqpJREFUaN60lWGagjAMRMfS0lIBQVjA+19095ehDK5g47vA+yaTtDiMsYVzlz8eZXkfxip2AarY4iI8nlyb6KGCEYFIhHtV52dwqUEkwhBDbgiWMOWtzlawhGk+aidVsITThNNdXAiSkGbGKdzlgIRpfW4MljDlktmGK6wxAPrg626u2nJXc+s/HpWzBkQdxx3RMOEtZs+AV/RLS5Zrfd5R4H98tY1T/px0sIIJohHLcYfDMaaRLIcdBofprqnldS80qROEJm1/OrS7FieJSTNDf+AGDU7zk1huAGNzHYBPilneFYLPmO7r8j0XkuMQyzpLS8PKmpXg173MSFFwcPtleLlZFllE3jA+9QKZNNQ9B0EuYVV+sx/EIJvuIdR7QQoo0Oy1kjss3mNeMEtBcqkkSlQKwgSJcqfaC0A9Sr2tHVp4kVSbaTmo0W7mRQ+KBotE8eluQY9eqo9JJQ6KjPK06E+LH+MrAHq21PcrrK8EqkgpHSxVor7EEQWdu/rRV3DUuxLzUzLCaffOX9dAy6VGLTu8kkCXIB/X9yT9FySMXONvt2awwyAMw9Aldv7/l7fDJKJ5hwH2ZblVgjySllLi5CDL819C2svoBZk8ZHLbCg9IbIPcjmNb/U5R7qO1V9QehBZX7iDBBZEjkX9KIMjAlFCGgWzlDtzzAcExTmQLsZ8gyItR/lDUJe2hQBaTcM2BKBjmQJApe6g7RZc1WUiVoiCB+ItqlAf2lwe7lvkLnfq0tJdslTH+4rM68ZfRVRqhXRBQBuzShqZi/CKNqpM35CbHrV0Xg4EwzBKgIqrdYqYiqr2y7INTynAKzM2vl1qk8pd1EwI4uVZYl42W9gU1TVU0GFpaStTuHg4apxBt6MHxIdRomAtDOGhvE5kCaHCu7XBvmwF/j+AJ1TBPvdq9Ao0AAAAASUVORK5CYII=) no-repeat center" : "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAUVBMVEUAAAAjIyMjIyMjIyMjIyP///////////////////////////////////////////////////////////////////////////////////////9oVgQTAAAAGnRSTlMAMiEJFfMXmXj55zErI7PFpQrh0rtEcGZNVmq03mUAAAKgSURBVGjetJbbsoMgDEVTQEDxUqtV2///0HOeuqWRqZR0vTtrdnbCSKfRRil1+edZVbdpdn6zJIpRF/B80fS+JRE0BJCAmwtiGbgETN5KhYCEU1+DmAISTv9VO1AkJCyNze4iYYCEUy3FMSBJM3SlMSBJU62FMZQyWhPRaLuwLW6oDjXX8WuHMpoYwc81t0wnRqaPDJRiXAdmaUK+Q334onXVezH3TAcUaayrcyw6SwG6mVlOOzSd5tHElnQv+TGA7eP2u1O7aygTHzUzjSccmrK5V9FV0gGGObJpo2LWT4XQd3S3ffm8FlXigGWfZWDDKpoVaPe9LBRT6AD3GpLKJodlqAif2jDNbrCAHpK6TQShUmwDS38cRFMxjycIR0EUCdAftSIzLNDVaMXyG1EkgkMULxwEWJzkDbUjiHiU8F47SdFC4jAtBJFhwLzeJIbEWBGljXeL5BhRvY8qUSTIjKdFflr8MW4gwbMlvl+WtGwlAKVsZFgl4kvsee/yR+9IyfYOlpdkJiXbO9jwxyq9XCBgh3cSksXiz+h3kvGHEoBr/OvWXHIYhoEQWjHc/8ztjqmQ1UaBTdhZSuYFO98hRYgqPxIyWcYsCPoQ9G4rFKR3g9yF2Yew99BS3fkalE6u3osEN6Sy8lZ2ITtLQhsWZqv3wg1VtXFhtmAfQQUjU/ics5K+SIgb4YEbNuJghI2g0vbwckJL0clCqxUFM5JvqtEOONoe9FZ8vtHpR8t4y9YZyDefvUi+je7RCOOBgDNQiTZojHBI48lhIW7yXWPBmQRjhCNAIcRIh5lCiBGJZSUKIUYyYB4RlhCJyj+aIU5bBUL/X2Lg9wXTreuXTRsSijakwSXEBP7BySMkdtbC7VRMuIgDgK+shgB09YP/O3gDX9pRu7/a1D0AAAAASUVORK5CYII=) no-repeat center")};
        background-size: cover;
        animation: ${rotate} 1.2s linear infinite;
    }
`;

export const Loading: React.FC<LoadingProps> = ({ loading = true, lightmode = false }) => (
  <Center mx="auto">
    <StyledLoading visible={loading} light={lightmode}><span></span></StyledLoading>
  </Center>
);
