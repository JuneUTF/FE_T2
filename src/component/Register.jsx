import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {
  const { register, handleSubmit, formState: { errors} } = useForm({mode: 'onChange'})
  const [messenger, setMessenger] = useState("");
  const navigate  = useNavigate();

    const onSubmit = item => {
      console.log(item)
        axios.post("http://localhost:8080/register",item,{
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then(res =>{
          console.log(res)
          if(res.data.information==="存在しました"){
            window.scrollTo(0, 0);
            setMessenger("ユーザー名が存在しました");
            document.getElementById('username').focus();
          }if(res.data.information==="Insertできました"){
            const txtmsg = "登録できませんでした。"
            navigate('/login', { state:  txtmsg  });
          }else{
            setMessenger("エラーしました。")
            window.scrollTo(0, 0);
          }

        })
    };
    return (
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase text-center">登録</h2>
                    <div className="mb-3">
                    {messenger && <div className='alert alert-danger'> {messenger}</div>}
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        {/* エラー移動します */}
                       
                        <Form.Group controlId="username">
                          <Form.Label className="text-center">ユーザー名</Form.Label>
                          <Form.Control type="text" placeholder="ユーザー名を入力してください。" 
                          {...register("username",{
                            required: "ユーザー名を入力してください。",
                            minLength: { value: 5, message: "ユーザー名は５文字以上です。" },
                            maxLength: { value: 50, message: "ユーザー名は50文字以内です。" }
                            ,
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "アルファベットと番号のみです。"
                            }
                        })} 
                          />
                        </Form.Group>
                        <div className='text-danger fw-light mb-3 mt-1'>{errors.username && errors.username.message}　</div>
                        <Form.Group
                          className="mb-3" controlId="password">
                          <Form.Label>パスワード</Form.Label>
                          <Form.Control type="password" {...register("password",{
                            required: "パスワードを入力してください。",
                            minLength: { value: 8, message: "パスワードは8文字以上です。" },
                            maxLength: { value: 50, message: "パスワードは50文字以内です。" },
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "アルファベットと番号のみです。"
                            }
                        })} placeholder="パスワードを入力してください。" />
                        </Form.Group>
                        <div className='text-danger fw-light mb-3 mt-1'>{errors.password && errors.password.message}　</div>
                        {/* name input */}
                        <Form.Group controlId="name">
                          <Form.Label className="text-center">名前</Form.Label>
                          <Form.Control type="text" placeholder="名前を入力してください。" 
                          {...register("name",{
                            required: "名前を入力してください。",
                            pattern: {
                                value: /^[a-zA-Zぁ-んァ-ン一-龯]+$/,
                                message: "アルファベットと日本語のみです。"
                            }
                        })} 
                          />
                        </Form.Group>
                        <div className='text-danger fw-light mb-3 mt-1'>{errors.name && errors.name.message}　</div>
                        {/* 住所 */}
                        <Form.Group controlId="address">
                          <Form.Label className="text-center">住所</Form.Label>
                          <Form.Control type="text" placeholder="住所を入力してください。" 
                          {...register("address",{
                            required: "住所を入力してください。"
                        })} 
                          />
                        </Form.Group>
                        <div className='text-danger fw-light mb-3 mt-1'>{errors.address && errors.address.message}　</div>
                        {/*  生年月日*/}
                        <Form.Group controlId="birthday">
                          <Form.Label className="text-center">
                          生年月日</Form.Label>
                          <Form.Control type="date"
                          {...register("birthday",{
                            required: "生年月日を入力してください。"
                        })} 
                          />
                        </Form.Group>
                        <div className='text-danger fw-light mb-3 mt-1'>{errors.birthday && errors.birthday.message}　</div>
                         {/* 性別*/}
                        <Form.Group controlId="sex">
                          <Form.Label className="text-center me-3">
                          性別</Form.Label> 
                            <Form.Check inline label="男性" type="radio" value="男性" 
                          {...register("sex",{
                            required: "性別を選んでください。"} 
                          )}
                          />
                            <Form.Check inline label="女性" type="radio" value="女性" 
                          {...register("sex",{
                            required: "性別を選んでください。"} 
                          )}
                          />
                        </Form.Group>
                        <div className='text-danger fw-light mb-3 mt-1'>{errors.sex && errors.sex.message}　</div>
                        {/* ビザ番号 */}
                        <Form.Group controlId="visa_ID">
                          <Form.Label className="text-center">
                          ビザ番号</Form.Label>
                          <Form.Control type="text" placeholder="ビザ番号を入力してください。" 
                          {...register("visa_ID",{
                            required: "ビザ番号を入力してください。",
                            minLength: { value: 12, message: "ビザ番号とは12文字です。" },
                            maxLength: { value: 12, message: "ビザ番号とは12文字です。" },
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                // mada
                                message: "アルファベットと日本語のみです。"
                            }
                        })} 
                          />
                        </Form.Group>
                        <div className='text-danger fw-light mb-3 mt-1'>{errors.visa_ID && errors.visa_ID.message}　</div>
                        {/* ビザ期限 */}
                        <Form.Group controlId="visa_date">
                          <Form.Label className="text-center">ビザ期限</Form.Label>
                          <Form.Control type="date" placeholder="ビザ期限を入力してください。" 
                          {...register("visa_date",{
                            required: "ビザ期限を入力してください。"
                        })} 
                          />
                        </Form.Group>
                        <div className='text-danger fw-light mb-3 mt-1'>{errors.visa_date && errors.visa_date.message}　</div>
                        {/*  visatype*/}
                        <Form.Group controlId="visa_type">
                            <Form.Label className="text-center">在留資格</Form.Label>
                            <Form.Select aria-label="Default select " {...register("visa_type",{
                            required: "ビザ期限を入力してください。"
                            })} >
                                <option value="">在留資格</option>
                                <option value="留学">留学</option>
                                <option value="就労ビザ ">就労ビザ </option>
                                <option value="投資経営ビザ">配投資経営ビザ</option>
                                <option value="高度外国人材">高度外国人材</option>
                                <option value="観光ビザ">観光ビザ</option>
                                <option value="商用/観光ビザ">商用/観光ビザ</option>
                                <option value="定住">定住</option>
                                <option value="永住者配偶者">永住者配偶者</option>
                                <option value="日本人配偶者">日本人配偶者</option>
                                <option value="難民 ">難民 </option>
                                <option value="医療滞在ビザ">医療滞在ビザ</option>
                                <option value="更新中">更新</option>
                            </Form.Select>
                        </Form.Group>
                        <div className='text-danger fw-light mb-3 mt-1'>{errors.visa_type && errors.visa_type.message}　</div>
                        {/* 国籍 */}
                        <Form.Group controlId="country">
                          <Form.Label className="text-center">国籍</Form.Label>
                          <Form.Control type="text" placeholder="国籍を入力してください。" 
                          {...register("country",{
                            required: "国籍を入力してください。"
                        })} 
                          />
                        </Form.Group>
                        <div className='text-danger fw-light mb-3 mt-1'>{errors.country && errors.country.message}　</div>
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            登録
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3 btn-group d-flex justify-content-center">
                        <div className="row vw-100">
                        <Link className='col btn btn-primary mx-4' to='/'>ホーム</Link>
                        <Link className='col btn btn-success mx-4' to='/'>パスワード忘れ</Link>
                        <Link className='col btn btn-primary mx-4' to='/login'>ログイン</Link>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
  )
}

export default Register