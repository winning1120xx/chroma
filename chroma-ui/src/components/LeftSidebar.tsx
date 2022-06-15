// @ts-nocheck
import React from 'react';
import { Flex, Center, Box, Button, useColorModeValue, useTheme, Divider, Square, Icon, Tabs, TabList, Tab, Stack, Skeleton } from '@chakra-ui/react'
import { BsFillSquareFill } from 'react-icons/bs';
import SidebarButton from './Shared/SidebarButton';

interface LeftSidebarProps {
  classClicked: (classtring: string) => void
  typeClicked: (typestring: string) => void
  classDict: any[]
  showSkeleton: boolean
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ classClicked, typeClicked, classDict, showSkeleton }) => {
  const theme = useTheme();
  const bgColor = useColorModeValue("#FFFFFF", '#0c0c0b')
  const borderColor = useColorModeValue(theme.colors.ch_gray.light, theme.colors.ch_gray.dark)

  if (classDict === undefined) {
    classDict = [
      {
        title: 'no data',
        color: 'red',
        visible: true,
        subtypes: [],
      },
    ]
  }

  return (
    <Flex
      direction="column"
      minWidth={300}
      bg={bgColor}
      borderRight="1px"
      borderLeft="1px"
      borderColor={borderColor}
      maxHeight="100vh"
      overflowX="hidden"
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': {
          width: '0px',
        },
      }}
      pt={14}>
      <Flex key="buttons" px={3}>
        <Tabs size="sm" variant='unstyled'>
          <TabList>
            <Tab _selected={{ fontWeight: 600 }} px={1} isDisabled>Classes</Tab>
          </TabList>
        </Tabs>
      </Flex>
      <Divider w="100%" pt={2} />
      <Flex direction="column" mt={2}>
        {showSkeleton ?
          <Stack mx={3}>
            <Skeleton height='25px' />
            <Skeleton height='25px' style={{ marginLeft: '30px' }} />
            <Skeleton height='25px' style={{ marginLeft: '30px' }} />
            <Skeleton height='25px' />
            <Skeleton height='25px' style={{ marginLeft: '30px' }} />
            <Skeleton height='25px' style={{ marginLeft: '30px' }} />
          </Stack>
          : classDict.map(function (chClass, index) {
            return (
              <React.Fragment key={index}>
                <SidebarButton
                  text={chClass.title}
                  symbol="square"
                  visible={chClass.visible}
                  color={chClass.color}
                  indent={0}
                  classTitle={chClass.title}
                  keyName={chClass.title}
                  onClick={classClicked}
                ></SidebarButton>

                {chClass.subtypes.map(function (chType) {
                  return (
                    <SidebarButton
                      text={chType.title}
                      visible={chType.visible}
                      symbol="circle"
                      color={chType.color}
                      classTitle={chClass.title}
                      key={chType.title}
                      indent={6}
                      onClick={typeClicked}>
                    </SidebarButton>
                  )
                })}
              </React.Fragment>
            )
          })
        }
      </Flex>
    </Flex>
  )
}

export default LeftSidebar
