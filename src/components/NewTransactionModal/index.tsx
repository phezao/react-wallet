import { FormEvent, useState } from "react";
import Modal from "react-modal"
import { Container, RadioBox, TransactionTypeContainer } from "./styles"
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from "../../Hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean,
  onRequestClose: () => void;
}

export const NewTransactionModal = ({isOpen, onRequestClose}: NewTransactionModalProps) => {

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  const { createTransaction } = useTransactions();

  const handleSetTypeDeposit = () => {
    setType("deposit");
  }

  const handleSetTypeWithdraw = () => {
    setType("withdraw");
  }

  const handleCreateNewTransaction = async (e: FormEvent) => {
    e.preventDefault();

    await createTransaction({
      title,
      type,
      amount,
      category
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
    <button type="button"
      onClick={onRequestClose}
      className="react-modal-close"
      >
      <img src={closeImg} alt="fechar modal" />
    </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Valor"  value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
        <TransactionTypeContainer>
          <RadioBox type="button"
            onClick={handleSetTypeDeposit}
            isActive={type === "deposit"}
            activeColor="green"
            >
            <img src={incomeImg} alt="entradas" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox type="button"
            onClick={handleSetTypeWithdraw}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="saídas" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input type="text" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}
