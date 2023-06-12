import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinners from "../Spinners";
import AdminSpinners from "./AdminSpinners";

const DashBoardAdmin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allConver, setAllConver] = useState([]);
  const [allMessage, setAllMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + "/admin/allusers",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setAllUsers(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(err.response.data.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + "/admin/allconver",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setAllConver(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(err.response.data.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + "/admin/allmessage",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setAllMessages(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(err.response.data.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Row className="mt-5">
        {isLoading ? (
          <div className="d-flex justify-content-center">
            {" "}
            <AdminSpinners />
          </div>
        ) : (
          <>
            <Col md={4}>
              <Card className="text-center p-2">
                <Card.Title className="d-flex gap-2 justify-content-center align-items-center">
                  <span className="members">Total Members</span>
                  <span>
                    <SupervisedUserCircleIcon />{" "}
                  </span>
                </Card.Title>
                <Card.Body>
                  <div className="fw-bold fs-5">= {allUsers.length}</div>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col md={4}>
              <Card className="text-center p-2">
                <Card.Title className="d-flex gap-2 justify-content-center align-items-center">
                  <span className="members">Total Conversations</span>
                  <span>
                    <QuestionAnswerIcon />
                  </span>
                </Card.Title>
                <Card.Body>
                  <div className="fw-bold fs-5">= {allConver.length}</div>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col md={4}>
              <Card className="text-center p-2">
                <Card.Title className="d-flex gap-2 justify-content-center align-items-center">
                  <span className="members">Chat History</span>
                  <span>
                    <MarkChatReadIcon />{" "}
                  </span>
                </Card.Title>
                <Card.Body>
                  <div className="fw-bold fs-5">= {allMessage.length}</div>
                </Card.Body>
              </Card>
            </Col>
            {isError && (
              <div
                className=" w-50 margin-auto  mt-5 alert alert-danger"
                role="alert"
              >
                {isError}
              </div>
            )}
          </>
        )}
      </Row>
    </>
  );
};

export default DashBoardAdmin;
