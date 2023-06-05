import React from 'react';
import { useAuthUser } from '../../hooks/useAuthUser';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import './MainPage.css'

export const MainPage = () => {
    const { user } = useAuthUser();
    const navigate = useNavigate();

    const onClickCreateCollection = () => {
        if (user) {
            navigate('/createCollection');
        } else {
            navigate('/login');
        }
    };

    return (
      <>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <Heading as="h1" size="2xl" mb="4">
                Вебзастосунок для допомоги ЗСУ
              </Heading>
              <Text fontSize="xl" mb="8">
                Приєднайтесь до нас та допоможіть Збройним Силам України.
              </Text>
              <Flex justifyContent="center">
                <Button
                  className="custom-button"
                  variant="solid"
                  size="lg"
                  onClick={() => navigate('/catalogCollections')}
                  mr="4"
                >
                  Хочу допомагати
                </Button>
                <Button
                  className="custom-button"
                  variant="solid"
                  size="lg"
                  onClick={onClickCreateCollection}
                >
                  Відкрити збір
                </Button>
              </Flex>
            </div>
          </div>
        </section>
        <div className="section-divider"></div>
        <section className="features">
          <div className="container">
            <div className="section-divider"></div>

            <div className="row">
              <div className="col-md-4">
                <div className="feature-item">
                  <i className="fas fa-donate"></i>
                  <h3>Пожертвування</h3>
                  <p>
                    Зробіть пожертвування для підтримки Збройних Сил України.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-item">
                  <i className="fas fa-users"></i>
                  <h3>Волонтерство</h3>
                  <p>
                    Приєднуйтесь до нашої команди волонтерів та допомагайте Збройним Силам України.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-item">
                  <i className="fas fa-shield-alt"></i>
                  <h3>Підтримка ЗСУ</h3>
                  <p>
                    Надайте підтримку військовим, які служать у Збройних Силах України, та допоможіть їм в адаптації до цивільного життя.
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="feature-item">
                  <i className="fas fa-hospital-symbol"></i>
                  <h3>Медична допомога</h3>
                  <p>
                    Забезпечте медичну допомогу ветеранам Збройних Сил України, що повернулися з бойових дій. Ваша підтримка допоможе забезпечити їм необхідні медичні процедури та реабілітацію.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-item">
                  <i className="fas fa-handshake"></i>
                  <h3>Партнерство</h3>
                  <p>
                    Ми шукаємо партнерів, які бажають співпрацювати з нами для підтримки Збройних Сил України. Разом ми можемо зробити більше і досягти більшого впливу на життя наших захисників.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-item">
                  <i className="fas fa-heart"></i>
                  <h3>Допоможіть у проекті</h3>
                  <p>
                    Приєднуйтеся до наших волонтерських проектів, щоб активно допомагати Збройним Силам України та ветеранам. Разом ми можемо створити позитивні зміни та допомогти тим, хто цього найбільше потребує.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
};
