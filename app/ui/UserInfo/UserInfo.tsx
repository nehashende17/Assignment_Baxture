"use client";
import { useCallback, useEffect, useState } from "react";
import { Avatar, Button, Group, Paper, Text } from "@mantine/core";
import {
  IconPhoneCall,
  IconAt,
  IconWorld,
  IconTrash,
  IconUserPlus,
  IconStar,
  IconUserMinus,
} from "@tabler/icons-react";
import classes from "./UserInfo.module.css";
import { IconAndText } from "../../lib/common/IconAndText";

type UserInfoProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  handleDeleteUser: any;
};

export const UserInfo = ({id, name, email, phone, website, handleDeleteUser} : UserInfoProps) => {
  const [avatarInitials, setAvatarInitials] = useState('');
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowClick = useCallback(() => {
    setIsFollowed(!isFollowed);
  }, [isFollowed]);

  const openInNewTab = useCallback((inputValue: string) => {
    window.open(inputValue, "_blank", "noreferrer");
  }, []);

  const handleDelete = () => {
    handleDeleteUser(id)
  }

  const generateSolidColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    if (name) {
    const initialsList = name.split(' ');
    const userName = initialsList.map((n, i) => {
      if (i==0 || i==(initialsList.length-1)) {
        return n[0]
      }
    }).join("");
    setAvatarInitials(userName);
    }
  }, [])

  return (
    <div>
      <Paper
        radius="md"
        withBorder
        p="lg"
        bg="var(--mantine-color-body)"
        className={classes.paper}
      >
        {avatarInitials &&
          <Avatar
            size={120}
            radius={120}
            mx="auto"
            style={{backgroundColor: generateSolidColor()}}
          >
            <span className={classes.fontWhite}>{avatarInitials}</span>
          </Avatar>}

        <Group gap={10} mt={3} className={classes.center}>
          <Text ta="center" fz="lg" fw={500}>
            {name}
          </Text>
          {isFollowed && <IconStar stroke={1.5} size="1rem" className={classes.darkIcon} ></IconStar>}
        </Group>

        <Group wrap="nowrap" gap={10} mt={3}>
          <IconAndText
            icon={<IconAt stroke={1.5} size="1rem" className={classes.icon} />}
            text={<Text
              className={classes.text}
              onClick={() => openInNewTab(`mailto:${email}`)}>
                {email}
              </Text>}
          ></IconAndText>
        </Group>

        <Group wrap="nowrap" gap={10} mt={5}>
          <IconAndText
            icon={<IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />}
            text={<Text
              className={classes.text}
              onClick={() => openInNewTab(`tel:${phone}`)}>
                {phone}
            </Text>}
          ></IconAndText>
        </Group>

        <Group wrap="nowrap" gap={10} mt={5}>
          <IconAndText
            icon={<IconWorld stroke={1.5} size="1rem" className={classes.icon} />}
            text={<Text
              className={classes.text}
              onClick={() => openInNewTab(website)}
            >
              {website}
            </Text>}
          ></IconAndText>
        </Group>

        <Group wrap="nowrap" gap={10} mt={15}>
          <Button
            onClick={handleFollowClick}
            variant={isFollowed ? "default" : "filled"}
            className={classes.button}
          >
            <Group wrap="nowrap" gap={10}>
              {isFollowed ? <IconAndText
                icon={<IconUserMinus
                  stroke={1.5}
                  size="1rem"
                  className={classes.darkIcon}
                />}
                text={'Unfollow'}>
              </IconAndText>
                : <IconAndText
                icon={<IconUserPlus
                  stroke={1.5}
                  size="1rem"
                  className={classes.fontWhite}
                />}
                text={'Follow'}>
                </IconAndText>}
            </Group>
          </Button>

          <Button variant="outline" className={classes.button} onClick={handleDelete}>
            <Group wrap="nowrap" gap={10}>
              <IconAndText
                icon={
                  <IconTrash
                    stroke={1.5}
                    size="1rem"
                    className={classes.deleteIcon}
                  />
                }
                text={'Delete'}
              ></IconAndText>
            </Group>
          </Button>
        </Group>
      </Paper>
    </div>
  );
};
