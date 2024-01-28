import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updatePlayers } from "../actions/actions";

export const Container = styled.div``;

export const Table = styled.table`
  width: 85%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  margin: 40px auto;
`;

export const Th = styled.th`
  background-color: #ffe08a;
  color: #946c00;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-weight: bold;
`;

export const Tr = styled.tr`
  background-color: #fffaeb;
  transition: transform 0.5s ease-in-out, background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
  }

  &.reorder-animation {
    transition: transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
  }
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;
const PrimaryBlueButton = styled.button`
  background-color: #007bff; /* Use the primary blue color code */
  color: #fff; /* Text color */
  padding: 10px 20px; /* Adjust padding as needed */
  font-size: 16px; /* Adjust font size as needed */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Adjust hover color if desired */
  }
`;
export const inputDiv = styled.div`
  display: flex;
  text-align:left
  width: 85%;
  margin: auto;
`;
export const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #007bff; /* Use the same primary blue color for the border */
  border-radius: 5px;
  margin-right: 10px; /* Add some margin if needed */
`;

const Admin = () => {
  const dispatch = useDispatch();
  const { current, previous } = useSelector((state) => state.players);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [shouldStopRender, setShouldStopRender] = useState(false);

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchStreamers();
    }, 2000);
  }, [current]);

  useEffect(() => {
    current.forEach((player, index) => {
      const prevPlayer = previous.find((a) => a.userID === player.userID);
      if (player.userID === "u-1" || player.userID === "u-2") {
      }
      if (prevPlayer && prevPlayer.score < player.score && index !== 0) {
        handleMoveUp(index);
      } else if (prevPlayer && prevPlayer.score > player.score && index !== 0) {
        handleMoveDown(index);
      }
    });
  }, [current, previous]);

  const fetchStreamers = async () => {
    try {
      const response = await fetch("http://localhost:3001/streamers");
      const newData = await response.json();
      dispatch(updatePlayers(current, newData));
    } catch (error) {
      console.error("Error fetching streamers:", error);
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    if (current[index].score > current[index - 1].score) {
      console.log("score is greater");
    }

    const container = document.getElementById("container");
    const trs = container.querySelectorAll("tbody tr");
    const clickedTr = trs[index];
    const prevTr = trs[index - 1];
    const distance = clickedTr.offsetHeight;

    if (clickedTr && prevTr) {
      if (clickedTr.parentNode === prevTr.parentNode) {
        clickedTr.style.transition =
          "transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1)";
        prevTr.style.transition =
          "transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1)";

        clickedTr.style.transform = `translateY(-${distance}px)`;
        prevTr.style.transform = `translateY(${distance}px)`;

        setTimeout(() => {
          clickedTr.style.transition = "none";
          prevTr.style.transition = "none";
          clickedTr.style.transform = "translateY(0)";
          prevTr.style.transform = "translateY(0)";
        }, 500);
      } else {
        console.error("Both elements must have the same parent node.");
      }
    }
  };

  const handleMoveDown = (index) => {
    if (index === current.length - 1) return;

    const container = document.getElementById("container");
    const trs = container.querySelectorAll("tbody tr");
    const clickedTr = trs[index];
    const nextTr = trs[index + 1];
    const distance = clickedTr.offsetHeight;

    if (clickedTr && nextTr) {
      if (clickedTr.parentNode === nextTr.parentNode) {
        clickedTr.style.transition =
          "transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1)";
        nextTr.style.transition =
          "transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1)";

        clickedTr.style.transform = `translateY(${distance}px)`;
        nextTr.style.transform = `translateY(-${distance}px)`;

        setTimeout(() => {
          clickedTr.style.transition = "none";
          nextTr.style.transition = "none";
          clickedTr.style.transform = "translateY(0)";
          nextTr.style.transform = "translateY(0)";
        }, 500);
      } else {
        console.error("Both elements must have the same parent node.");
      }
    }
  };

  const shouldAnimateSwap = (player, index) => {
    const prevPlayer = previous[index];
    return prevPlayer && prevPlayer.position !== player.position;
  };
  const handleCheckButtonClick = () => {
    const loginStreamer = async () => {
        try {
          const response = await fetch("http://localhost:3001/set-highest-point", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              point: inputValue,
             
            }),
          });

          const newData = await response.json();
        } catch (error) {
        }
      };
      loginStreamer();
  };

  return (
    <Container id="container">
      <inputDiv>
        <label>
          <StyledInput
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <PrimaryBlueButton onClick={() => handleCheckButtonClick()}>
          Check
        </PrimaryBlueButton>
      </inputDiv>
      <Table>
        <thead>
          <tr>
            <Th>Sr. No. </Th>
            <Th>Name</Th>
            <Th>Score</Th>
          </tr>
        </thead>
        <tbody>
          {current.map((player, index) => (
            <Tr
              key={player.userID}
              className={`fade ${
                !isInitialRender && shouldAnimateSwap(player, index)
                  ? "reorder-animation"
                  : ""
              }`}
            >
              <Td>{index + 1}</Td>
              <Td>{player.displayName}</Td>
              <Td>{player.score}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Admin;
