<?php
namespace frontend\models;

use yii\base\Model;
use common\models\User;

/**
 * Signup form
 */
class SignupForm extends Model
{
    public $username;
    public $email;
    public $password;
    public $id_curso;


    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['username', 'trim'],
            ['username', 'required', 'message'=>'Este campo é obrigatório'],
            ['username', 'unique', 'targetClass' => '\common\models\User', 'message' => 'Este username já foi usado.'],
            ['username', 'string', 'min' => 2, 'max' => 255],

            ['email', 'trim'],
            ['email', 'required', 'message'=>'Este campo é obrigatório'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => '\common\models\User', 'message' => 'Este email já foi usado.'],

            ['password', 'required', 'message'=>'Este campo é obrigatório'],
            ['password', 'string', 'min' => 3],

            ['id_curso', 'required'],
        ];
    }

    /**
     * Signs user up.
     *
     * @return User|null the saved model or null if saving fails
     */
    public function signup()
    {
        if (!$this->validate()) {
            return null;
        }

        $user = new User();
        $user->username = $this->username;
        $user->email = $this->email;
        $user->setPassword($this->password);
        $user->generateAuthKey();

        $user->id_curso = $this->id_curso;

        return $user->save() ? $user : null;
    }

    public function attributeLabels()
    {
        return [
            'password' => 'Senha',
        ];
    }
}
